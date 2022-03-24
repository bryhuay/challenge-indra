import { APIGatewayProxyEvent } from "aws-lambda";
import { main } from "../../src/functions/list-post/handler";

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
        } as any
        const result = await main(event)

        expect(result.statusCode).toEqual(200);
    });
});