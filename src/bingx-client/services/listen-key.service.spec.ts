import { ApiAccount } from 'bingx-api/bingx/account/api-account';
import { BingxDeleteListenKeyEndpoint } from 'bingx-api/bingx/endpoints/bingx-delete-listen-key-endpoint';
import { RequestExecutorInterface } from 'bingx-api/bingx/request-executor/request-executor.interface';
import { ListenKeyService } from 'bingx-api/bingx-client/services/listen-key.service';

describe('listen key service', () => {
  it('must delete listen key', async () => {
    const account = new ApiAccount('api-key', 'secret-key');
    const requestExecutor: RequestExecutorInterface = {
      execute: jest.fn().mockResolvedValue(undefined),
    };
    const service = new ListenKeyService(requestExecutor);

    await service.deleteListenKey(account, 'listen-key');

    expect(requestExecutor.execute).toHaveBeenCalledTimes(1);
    const endpoint = (requestExecutor.execute as jest.Mock).mock.calls[0][0];
    expect(endpoint).toBeInstanceOf(BingxDeleteListenKeyEndpoint);
    expect(endpoint.method()).toBe('delete');
    expect(endpoint.path()).toBe('/openApi/user/auth/userDataStream');
    expect(endpoint.parameters().asRecord()).toMatchObject({
      listenKey: 'listen-key',
    });
  });
});
