// Create a new file named 'intasend-inlinejs-sdk.d.ts' in your project's types folder (create one if it doesn't exist)
// types/intasend-inlinejs-sdk.d.ts

declare module "intasend-inlinejs-sdk" {
  interface IntaSendConfig {
    publicAPIKey: string;
    live: boolean;
  }

  interface IntaSendInstance {
    on(event: string, callback: (response: any) => void): IntaSendInstance;
  }

  interface IntaSendConstructor {
    new (config: IntaSendConfig): IntaSendInstance;
  }

  global {
    interface Window {
      IntaSend: IntaSendConstructor;
    }
  }
}
