export default {
  displayName: 'meal-delivery-users-signup-react-components',
  preset: '../../../../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: { react: { runtime: 'automatic' } },
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../../../../coverage/projects/meal-delivery/libs/capabilities/registration/signup/components/react',
};
