import { defineFeature, loadFeature } from 'jest-cucumber';
import { ScenariosDefinitionCallbackFunction } from 'jest-cucumber/dist/src/feature-definition-creation';

export type Scope = 'frontend' | 'backend';

export type ScopeBasedFeatureTagFilter = `@${Scope}`;

export function defineFeatureTest(featureFilePath: string) {
  return (
    tagFilter: ScopeBasedFeatureTagFilter,
    scenariosDefinitionCallback: ScenariosDefinitionCallbackFunction
  ) =>
    defineFeature(
      loadFeature(featureFilePath, {
        tagFilter,
      }),
      scenariosDefinitionCallback
    );
}
