const scanner = require('sonarqube-scanner').default;

scanner(
  {
    serverUrl: 'http://localhost:9001',
    options: {
      'sonar.projectKey': 'MP_202610_G81_E1_Front',
      'sonar.projectName': 'MP_202610_G81_E1_Front',
      
      'sonar.token': 'sqp_def03bdf362c89bf329a5b138f0ae0b1db5278bd',

      'sonar.sources': 'src',
      'sonar.language': 'ts',
      'sonar.sourceEncoding': 'UTF-8',
      
      'sonar.exclusions': 'node_modules/**, bower_components/**, jspm_packages/**, typings/**, lib-cov/**',
      'sonar.test.inclusions': 'src/**/*.spec.ts, src/**/*.test.ts, src/**/*.spec.tsx, src/**/*.test.tsx',
    },
  },
  () => process.exit(0)
);
