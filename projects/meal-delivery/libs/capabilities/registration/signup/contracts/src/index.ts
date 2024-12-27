import { type AxiosClient } from '@tiagojacinto/api-primitives';
import { type EndpointResponse, UsersEndpoint } from '@tiagojacinto/meal-delivery-users-shared';

export type SignupDTO = {
  email: string;
  password: string;
};

export class RegistrationEndpoint extends UsersEndpoint<SignupDTO> {
  private static readonly uri = '/signup';

  constructor(private readonly client: AxiosClient) {
    super();
  }

  protected executeImpl(request: SignupDTO): Promise<EndpointResponse> {
    return this.client.post(RegistrationEndpoint.uri, {
      data: request,
    });
  }
}
