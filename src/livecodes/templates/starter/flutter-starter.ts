import type { Template } from '../../models';

/**
 * The Flutter starter. The compiled app boots the Flutter engine and renders into the result page
 * itself, so there is no markup or stylesheet to go with it.
 */
export const flutterStarter: Template = {
  name: 'flutter',
  title: window.deps.translateString('templates.starter.flutter', 'Flutter Starter'),
  thumbnail: 'assets/templates/flutter.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '',
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
        backgroundColor: const Color(0xFF14141A),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Flutter, client-side',
                style: TextStyle(color: Color(0xFFFFFFFF), fontSize: 20),
              ),
              const SizedBox(height: 12),
              Text(
                '\$_count',
                style: const TextStyle(
                  color: Color(0xFF4AC2F7),
                  fontSize: 56,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              ElevatedButton(
                onPressed: () => setState(() => _count++),
                child: const Text('Increment'),
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
