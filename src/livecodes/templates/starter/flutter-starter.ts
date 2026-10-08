import type { Template } from '../../models';

/**
 * The Flutter starter, matching the other starters: the app renders the heading, the logo and the
 * counter itself, since Flutter draws its own UI in the result page.
 */
export const flutterStarter: Template = {
  name: 'flutter',
  title: window.deps.translateString('templates.starter.flutter', 'Flutter Starter'),
  thumbnail: 'assets/templates/flutter.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '<div>Loading...</div>',
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'flutter',
    content: `
import 'package:flutter/material.dart';

void main() {
  print('Hello from Flutter!');
  runApp(const CounterApp());
}

class CounterApp extends StatefulWidget {
  const CounterApp({super.key});

  @override
  State<CounterApp> createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('Hello, Flutter!', style: TextStyle(fontSize: 24)),
              const SizedBox(height: 16),
              const FlutterLogo(size: 120),
              const SizedBox(height: 16),
              Text('You clicked \$_count times.', style: const TextStyle(fontSize: 16)),
              const SizedBox(height: 12),
              ElevatedButton(
                onPressed: () => setState(() => _count++),
                child: const Text('Click me'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`.trimStart(),
  },
};
