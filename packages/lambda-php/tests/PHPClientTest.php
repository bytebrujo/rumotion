<?php

namespace Picus\LambdaPhp\Tests;

use PHPUnit\Framework\TestCase;
use Picus\LambdaPhp\PHPClient;
use Picus\LambdaPhp\RenderParams;

class PHPClientTest extends TestCase
{
    public function testClient()
    {
        $client = new PHPClient(
            "us-east-1",
            "testbed",
            "picus-render",
            null
        );

        $params = new RenderParams(
            data: [
                'hi' => 'there'
            ],

        );
        $params->setComposition("react-svg");
        $params->setMetadata([
            'Author' => 'Picus'
        ]);

        $internalParams = $client->constructInternals($params);

        $this->assertEquals($client->getRegion(), "us-east-1");
        $this->assertIsArray($internalParams);
        $this->assertNotEmpty($internalParams);

        print(json_encode($internalParams));
    }
}
