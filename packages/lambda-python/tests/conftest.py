import pytest
from picus_lambda.picusclient import PicusClient
from tests.constants import (
    TEST_FUNCTION_NAME,
    TEST_REGION,
    TEST_SERVE_URL,
    TEST_AWS_ACCESS_KEY,
    TEST_AWS_SECRET_KEY,
)
from unittest.mock import Mock


@pytest.fixture
def picus_client():
    return PicusClient(
        region=TEST_REGION, serve_url=TEST_SERVE_URL, function_name=TEST_FUNCTION_NAME
    )


@pytest.fixture
def picus_client_with_creds():
    return PicusClient(
        region=TEST_REGION,
        serve_url=TEST_SERVE_URL,
        function_name=TEST_FUNCTION_NAME,
        access_key=TEST_AWS_ACCESS_KEY,
        secret_key=TEST_AWS_SECRET_KEY,
    )


@pytest.fixture
def mock_s3_client():
    return Mock()


@pytest.fixture
def mock_lambda_client():
    """Fixture for a mocked boto3 Lambda client."""
    return Mock()


@pytest.fixture
def mock_boto_client():
    """Fixture for a mocked boto3 Lambda client."""
    return Mock()
