import json
from tests.conftest import picus_client, mock_s3_client, picus_client_with_creds
from picus_lambda.picusclient import PicusClient
from picus_lambda.models import ( RenderType )
from picus_lambda.exception import (
    PicusException,
    PicusInvalidArgumentException,
    PicusRenderingOutputError
)

from botocore.exceptions import ClientError, ParamValidationError

import pytest
from tests.constants import (
    TEST_FUNCTION_NAME,
    TEST_REGION,
    TEST_SERVE_URL,
    TEST_AWS_SECRET_KEY,
    TEST_AWS_ACCESS_KEY,
)
from unittest.mock import patch, Mock
from botocore.config import Config
import boto3


def test_bucket_name_format(picus_client: PicusClient):
    bucket_name = picus_client._make_bucket_name()
    assert bucket_name.startswith("picuslambda-useast1-")


def test_client_config(picus_client: PicusClient):
    assert picus_client.function_name == TEST_FUNCTION_NAME
    assert picus_client.region == TEST_REGION
    assert picus_client.serve_url == TEST_SERVE_URL
    assert picus_client.session
    assert not picus_client.force_path_style


def test_client_config_with_creds(picus_client_with_creds: PicusClient):
    picus_client = picus_client_with_creds
    assert picus_client.function_name == TEST_FUNCTION_NAME
    assert picus_client.region == TEST_REGION
    assert picus_client.serve_url == TEST_SERVE_URL

    credentials = picus_client.session.get_credentials()
    assert credentials.access_key == TEST_AWS_ACCESS_KEY
    assert credentials.secret_key == TEST_AWS_SECRET_KEY
    assert not picus_client.force_path_style


@pytest.mark.parametrize(
    "hash_value,expected",
    [
        ("a1b2c3", "input-props/a1b2c3.json"),
        (
            "very_long_hash_value_123456789",
            "input-props/very_long_hash_value_123456789.json",
        ),
    ],
)
def test_input_props_key_multiple_values(picus_client, hash_value, expected):
    result = picus_client._input_props_key(hash_value)
    assert result == expected


def test_generate_hash_basic_string(picus_client: PicusClient):
    payload = "test payload"
    result = picus_client._generate_hash(payload)

    assert len(result) == 64
    assert all(c in '0123456789abcdef' for c in result)



@patch('picus_lambda.picusclient.Session')
def test_create_client_partial_creds(mock_session_class):
    with pytest.raises(PicusInvalidArgumentException):
        PicusClient(
            region=TEST_REGION,
            serve_url=TEST_SERVE_URL,
            function_name=TEST_FUNCTION_NAME,
            secret_key=TEST_AWS_SECRET_KEY,
        )


@patch('picus_lambda.picusclient.Session')
def test_create_client_partial_creds_and_session(mock_session_class):
    with pytest.raises(PicusInvalidArgumentException) as excinfo:
        custom_boto_session = boto3.Session(
            #region_name=PICUS_APP_REGION,
            # profile_name='your_aws_profile', # Uncomment if you use AWS profiles
            # If you provide aws_access_key_id, aws_secret_access_key here,
            # it will override the ones passed to PicusClient directly.
            # aws_access_key_id='YOUR_ACCESS_KEY',
            # aws_secret_access_key='YOUR_SECRET_KEY',
        )
        PicusClient(
            region=TEST_REGION,
            serve_url=TEST_SERVE_URL,
            function_name=TEST_FUNCTION_NAME,
            secret_key=TEST_AWS_SECRET_KEY,
            session=custom_boto_session
        )

    assert excinfo.type == PicusInvalidArgumentException
    assert "Cannot specify both 'session' and explicit credentials" in str(excinfo.value)


@patch('picus_lambda.picusclient.Session')
def test_session_created_with_creds(mock_session_class):
    PicusClient(
        region=TEST_REGION,
        serve_url="https://test.com",
        function_name="test-func",
        access_key=TEST_AWS_ACCESS_KEY,
        secret_key=TEST_AWS_SECRET_KEY,
    )

    mock_session_class.assert_called_once_with(
        aws_access_key_id=TEST_AWS_ACCESS_KEY,
        aws_secret_access_key=TEST_AWS_SECRET_KEY,
        region_name=TEST_REGION,
    )

@patch('picus_lambda.picusclient.Session')
def test_create_client_with_path_style(mock_session_class, mock_s3_client, ):
   # Create the client (this creates a mock session instance)
    picus_client = PicusClient(
        region=TEST_REGION,
        serve_url=TEST_SERVE_URL,
        function_name=TEST_FUNCTION_NAME,
        force_path_style=True,
    )

    # Get the mock session instance that was created
    mock_session_instance = mock_session_class.return_value
    mock_session_instance.client.return_value = mock_s3_client

    # Call the method
    result = picus_client._create_s3_client()

    # Check the .client() call on the session instance
    mock_session_instance.client.assert_called_once()

    call_args = mock_session_instance.client.call_args
    print(call_args)

    assert call_args[0][0] == 's3'  # First positional arg is service name
    assert 'config' in call_args[1]
    config = call_args[1]['config']
    assert isinstance(config, Config)
    assert config.s3['addressing_style'] == 'path'
    assert result == mock_s3_client


@patch.object(PicusClient, '_create_s3_client')
def test_get_picus_buckets_empty_response(
    mock_create_client, mock_s3_client, picus_client
):
    mock_s3_client.list_buckets.return_value = {'Buckets': []}
    mock_create_client.return_value = mock_s3_client

    result = picus_client._get_picus_buckets()

    assert result == []
    mock_s3_client.list_buckets.assert_called_once()


@patch.object(PicusClient, '_create_s3_client')
def test_get_picus_buckets_no_picus_buckets(
    mock_create_client, mock_s3_client, picus_client
):
    mock_s3_client.list_buckets.return_value = {
        'Buckets': [
            {'Name': 'my-app-bucket'},
            {'Name': 'some-other-bucket'},
            {'Name': 'user-data-bucket'},
        ]
    }
    mock_create_client.return_value = mock_s3_client

    result = picus_client._get_picus_buckets()

    assert result == []
    mock_s3_client.list_buckets.assert_called_once()
    mock_s3_client.get_bucket_location.assert_not_called()


@patch.object(PicusClient, '_create_s3_client')
def test_get_picus_buckets_single_match_us_east_1(
    mock_create_client, mock_s3_client, picus_client
):
    test_bucket_name = 'picuslambda-useast1-abc123'
    mock_s3_client.list_buckets.return_value = {
        'Buckets': [
            {'Name': test_bucket_name},
            {'Name': 'other-bucket'},
        ]
    }
    mock_s3_client.get_bucket_location.return_value = {'LocationConstraint': None}
    mock_create_client.return_value = mock_s3_client

    result = picus_client._get_picus_buckets()

    assert result == [test_bucket_name]
    mock_s3_client.get_bucket_location.assert_called_once_with(Bucket=test_bucket_name)



@patch.object(PicusClient, '_create_s3_client')
def test_get_or_create_bucket_client_error_on_create_bucket(
    mock_create_client, mock_s3_client, picus_client
):
    """
    Test that ClientError from create_bucket is re-raised directly.
    """
    mock_s3_client.list_buckets.return_value = {'Buckets': []} # Ensure new bucket creation path
    mock_s3_client.create_bucket.side_effect = ClientError({"Error": {"Code": "BucketAlreadyExists"}}, "CreateBucket")
    mock_create_client.return_value = mock_s3_client

    with pytest.raises(ClientError) as excinfo:
        picus_client._get_or_create_bucket()
    assert excinfo.type == ClientError
    assert "BucketAlreadyExists" in str(excinfo.value)
    mock_s3_client.create_bucket.assert_called_once()


@patch.object(PicusClient, '_create_s3_client')
def test_upload_to_client_error_on_put_object(
    mock_create_client, mock_s3_client, picus_client
):
    """
    Test that ClientError from put_object is re-raised directly.
    """
    mock_s3_client.put_object.side_effect = ClientError({"Error": {"Code": "InternalError"}}, "PutObject")
    mock_create_client.return_value = mock_s3_client

    with pytest.raises(ClientError) as excinfo:
        picus_client._upload_to_s3("test-bucket", "test-key", "payload")
    assert excinfo.type == ClientError
    assert "InternalError" in str(excinfo.value)
    mock_s3_client.put_object.assert_called_once()



@patch.object(PicusClient, '_get_picus_buckets')
def test_get_or_create_bucket_picus_exception_on_multiple_buckets(
    mock_get_picus_buckets, picus_client
):
    """
    Test that PicusException is raised when multiple Picus buckets are found.
    """
    mock_get_picus_buckets.return_value = [
        'picuslambda-us-east-1-bucket1',
        'picuslambda-us-east-1-bucket2',
    ]

    with pytest.raises(PicusException) as excinfo:
        picus_client._get_or_create_bucket()

    assert excinfo.type == PicusException
    assert "You have multiple buckets" in str(excinfo.value)
    mock_get_picus_buckets.assert_called_once()


@patch.object(PicusClient, '_create_lambda_client')
def test_invoke_lambda_unexpected_response_format(
    mock_create_lambda_client, mock_lambda_client, picus_client
):
    """
    Test that _invoke_lambda raises PicusRenderingOutputError for unexpected response types.
    """
    unexpected_payload = json.dumps([
        {'type': 'log', 'level': 'info', 'message': 'Still running'},
        {'status': 'pending', 'progress': 0.5} # Not 'success' or 'error'
    ])
    mock_lambda_client.invoke.return_value = {'Payload': Mock(read=lambda: unexpected_payload.encode('utf-8'))}
    mock_create_lambda_client.return_value = mock_lambda_client

    with pytest.raises(PicusRenderingOutputError) as excinfo:
        picus_client._invoke_lambda("my-function", "{}")

    assert excinfo.type == PicusRenderingOutputError
    assert "Unexpected Lambda response format" in str(excinfo.value)
    mock_lambda_client.invoke.assert_called_once()


@patch.object(PicusClient, '_create_lambda_client')
def test_invoke_lambda_invalid_json_decode(
    mock_create_lambda_client, mock_lambda_client, picus_client
):
    """
    Test that _invoke_lambda raises PicusException if the stream has invalid JSON objects.
    (Note: This uses PicusException, not PicusRenderingOutputError, as it's a structural parsing error).
    """
    invalid_stream = b'{"type":"log"} {"malformed_json" ' # Incomplete JSON
    mock_lambda_client.invoke.return_value = {'Payload': Mock(read=lambda: invalid_stream)}
    mock_create_lambda_client.return_value = mock_lambda_client

    with pytest.raises(PicusRenderingOutputError) as excinfo:
        picus_client._invoke_lambda("my-function", "{}")

    assert excinfo.type == PicusRenderingOutputError
    mock_lambda_client.invoke.assert_called_once()


@patch.object(PicusClient, '_serialize_input_props')
def test_construct_render_request_client_error_from_serialize_input_props(
    mock_serialize_input_props, picus_client
):
    """
    Test that construct_render_request raises PicusInvalidArgumentException
    if _serialize_input_props encounters and re-raises a ClientError.
    """
    # Simulate _serialize_input_props raising a ClientError (e.g., from _upload_to_s3)
    mock_serialize_input_props.side_effect = ClientError({"Error": {"Code": "AccessDenied"}}, "PutObject")

    mock_render_params = Mock()
    mock_render_params.input_props = {"dummy": "data"}
    mock_render_params.serialize_params.return_value = {"serialized": "params"}

    with pytest.raises(PicusInvalidArgumentException) as excinfo:
        picus_client.construct_render_request(mock_render_params, "still")

    assert excinfo.type == PicusInvalidArgumentException
    assert "Failed to serialize input properties for rendering" in str(excinfo.value)
    assert "AccessDenied" in str(excinfo.value) # Ensure the original ClientError info is present
    mock_serialize_input_props.assert_called_once_with(
        input_props=mock_render_params.input_props,
        render_type="still"
    )


@patch('boto3.client')
def test_create_client_with_session(mock_boto3_client_func):
    """
    Test that _create_s3_client uses the provided session
    instead of boto3.client directly.
    """
    # Arrange
    mock_session = Mock()
    mock_client_from_session = Mock()
    mock_session.client.return_value = mock_client_from_session

    config = Config()
    client = PicusClient(
        region=TEST_REGION,
        serve_url=TEST_SERVE_URL,
        function_name=TEST_FUNCTION_NAME,
        session=mock_session,
        config=config
    )

    # Act
    s3_client = client._create_s3_client()

    # Assert
    assert s3_client == mock_client_from_session
    mock_session.client.assert_called_once_with('s3', region_name=TEST_REGION, config=config)


@patch('picus_lambda.picusclient.Session')
def test_create_client_with_custom_timeout_config(mock_session_class, mock_s3_client):
    """
    Test that _create_s3_client correctly applies custom timeout settings
    provided via config.
    """
    # Arrange
    custom_timeout = 10  # seconds
    custom_config = Config(connect_timeout=custom_timeout, read_timeout=custom_timeout)

    # Set up mock BEFORE creating PicusClient
    mock_session_instance = mock_session_class.return_value
    mock_session_instance.client.return_value = mock_s3_client

    client = PicusClient(
        region=TEST_REGION,
        serve_url=TEST_SERVE_URL,
        function_name=TEST_FUNCTION_NAME,
        config=custom_config,
    )

    # Act
    s3_client = client._create_s3_client()

    # Assert
    assert s3_client == mock_s3_client
    mock_session_instance.client.assert_called_once()

    # Extract the config argument passed to session.client
    call_args, call_kwargs = mock_session_instance.client.call_args

    assert call_args[0] == 's3'
    assert call_kwargs['region_name'] == TEST_REGION

    passed_config = call_kwargs.get('config')
    assert isinstance(passed_config, Config)
    assert passed_config.connect_timeout == custom_timeout
    assert passed_config.read_timeout == custom_timeout
    assert passed_config.s3 is None


@patch.object(PicusClient, '_create_lambda_client')
def test_invoke_lambda_Invalid_argument(
    mock_create_lambda_client, mock_lambda_client, picus_client
):
    """
    Test that _invoke_lambda raises PicusRenderingOutputError for unexpected response types.
    """
    unexpected_payload = json.dumps([
        {'type': 'log', 'level': 'info', 'message': 'Still running'},
        {'status': 'pending', 'progress': 0.5} # Not 'success' or 'error'
    ])
    mock_lambda_client.invoke.return_value = {'Payload': Mock(read=lambda: unexpected_payload.encode('utf-8'))}
    mock_create_lambda_client.return_value = mock_lambda_client

    with pytest.raises(PicusRenderingOutputError) as excinfo:
        picus_client._invoke_lambda("my-function", "{}")

    assert excinfo.type == PicusRenderingOutputError
    assert "Unexpected Lambda response format" in str(excinfo.value)
    mock_lambda_client.invoke.assert_called_once()
