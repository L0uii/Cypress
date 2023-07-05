import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
    'baseUrl': 'http://127.0.0.1:4200',
    'env': {
      'username': 'harry.potter',
      'password': ''
    }
  },
  
  viewportWidth: 1920,
  viewportHeight: 1080,
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})