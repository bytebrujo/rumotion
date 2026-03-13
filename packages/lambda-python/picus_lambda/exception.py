# pylint: disable=too-few-public-methods, missing-module-docstring, broad-exception-caught
class PicusException(Exception):
    """Base exception for Picus client errors."""

class PicusInvalidArgumentException(PicusException, ValueError):
    """Raised when an invalid argument is provided to a Picus client method."""

class PicusRenderingOutputError(PicusException):
    """Raised when the Picus rendering process returns an error."""
