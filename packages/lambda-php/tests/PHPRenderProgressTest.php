<?php

namespace Picus\LambdaPhp\Tests;

use PHPUnit\Framework\TestCase;
use Picus\LambdaPhp\PHPClient;

class PHPRenderProgressTest extends TestCase
{
    public function testClient()
    {
        $client = new PHPClient(
            "us-east-1",
            "testbed",
            "picus-render",
            null
        );

        $internalParams = $client->makeRenderProgressPayload("abcdef", "picus-render");

        $this->assertNotEmpty($internalParams);

        print($internalParams);
    }
}
