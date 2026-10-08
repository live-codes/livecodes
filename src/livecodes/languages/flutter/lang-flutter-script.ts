import { setupDartRuntime } from '../dart/lang-dart-runtime';

// Flutter renders into the result page, which is also where the compiled Dart runs.
setupDartRuntime('flutter');
