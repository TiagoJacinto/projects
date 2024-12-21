import { defineFeatureTest } from '@tiagojacinto/acceptance-test-utils';
import * as path from 'path';

export const testSignupFeature = defineFeatureTest(
  path.join(__dirname, './signup.feature')
);

type AlreadyCreatedAccount = {
  email: string;
};

export type AlreadyCreatedAccountTable = AlreadyCreatedAccount[];
