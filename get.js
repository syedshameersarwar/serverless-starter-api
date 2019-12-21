import * as dynamoDBLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export const main = async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDBLib.call("get", params);
    if (result.Item) return success(result.Item);
    return failure({ status: false, error: "Item not found" });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
};
