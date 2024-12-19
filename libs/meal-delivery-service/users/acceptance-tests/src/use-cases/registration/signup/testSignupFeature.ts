import { defineFeature, loadFeature } from 'jest-cucumber';

import { ScopeBasedFeatureTagFilter } from '@tiagojacinto/testing-primitives';
import { ScenariosDefinitionCallbackFunction } from 'jest-cucumber/dist/src/feature-definition-creation';

export function testSignupFeature(
  tagFilter: ScopeBasedFeatureTagFilter,
  scenariosDefinitionCallback: ScenariosDefinitionCallbackFunction
) {
  defineFeature(
    loadFeature('signup.feature', {
      loadRelativePath: true,
      tagFilter,
    }),
    scenariosDefinitionCallback
  );
}

type AlreadyCreatedAccount = {
  email: string;
};

export type AlreadyCreatedAccountTable = AlreadyCreatedAccount[];
