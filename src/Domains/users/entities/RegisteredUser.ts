
type payloadUser = {
  id: string;
  username: string;
  fullname:string;
}
export default class RegisteredUser {
  id: string;
  username: string;
  fullname:string;
  constructor(payload: payloadUser) {
    this.verifyPayload(payload);

    this.id = payload.id;
    this.username = payload.username;
    this.fullname = payload.fullname;
  }

  private verifyPayload(payload: payloadUser):void {
    Object.values(payload).forEach((attrValue):void => {
      if (typeof attrValue !== 'string') {
        throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
      if (!attrValue) {
        throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
      }
    });
  }
}

