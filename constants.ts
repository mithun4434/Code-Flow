
import { LanguageConfig, LanguageMode, Theme } from './types';

export const LANGUAGES: Record<LanguageMode, LanguageConfig> = {
  [LanguageMode.JAVASCRIPT]: {
    id: LanguageMode.JAVASCRIPT,
    name: 'JavaScript',
    pistonRuntime: 'javascript',
    pistonVersion: '18.15.0',
    filename: 'index.js',
    boilerplate: `// Node.js 18.x
// STDIN is available via process.stdin

console.log("Hello from CodeFlow!");

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);

console.log("Sum calculated:", sum);
`,
  },
  [LanguageMode.TYPESCRIPT]: {
    id: LanguageMode.TYPESCRIPT,
    name: 'TypeScript',
    pistonRuntime: 'typescript',
    pistonVersion: '5.0.3',
    filename: 'index.ts',
    boilerplate: `// TypeScript 5.0
interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

const user: User = {
  id: 1,
  name: "CodeFlow Admin",
  role: "admin"
};

console.log(\`User \${user.name} authenticated.\`);
console.log("Type safety check passed.");
`,
  },
  [LanguageMode.PYTHON]: {
    id: LanguageMode.PYTHON,
    name: 'Python',
    pistonRuntime: 'python',
    pistonVersion: '3.10.0',
    filename: 'main.py',
    boilerplate: `# Python 3.10
# Runs in an isolated container

import sys

def main():
    print("Hello from CodeFlow!")
    print(f"Python version: {sys.version.split()[0]}")

if __name__ == "__main__":
    main()
`,
  },
  [LanguageMode.JAVA]: {
    id: LanguageMode.JAVA,
    name: 'Java',
    pistonRuntime: 'java',
    pistonVersion: '15.0.2',
    filename: 'Main.java',
    boilerplate: `// Java 15 OpenJDK
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from CodeFlow!");
        
        // Runtime metadata is captured automatically
        long memory = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
        System.out.println("Internal Memory Check: " + (memory / 1024) + " KB");
    }
}
`,
  },
  [LanguageMode.CSHARP]: {
    id: LanguageMode.CSHARP,
    name: 'C#',
    pistonRuntime: 'csharp',
    pistonVersion: '6.12.0',
    filename: 'main.cs',
    boilerplate: `// C# (Mono)
using System;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("Hello from CodeFlow C# Runtime!");
        
        int[] numbers = { 10, 20, 30, 40 };
        int sum = 0;
        foreach(int num in numbers) {
            sum += num;
        }
        
        Console.WriteLine($"Array Sum: {sum}");
    }
}
`,
  },
  [LanguageMode.CPP]: {
    id: LanguageMode.CPP,
    name: 'C++',
    pistonRuntime: 'c++',
    pistonVersion: '10.2.0',
    filename: 'main.cpp',
    boilerplate: `// GCC 10.2.0
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::cout << "Hello from CodeFlow!" << std::endl;
    
    std::vector<int> v = {1, 2, 3, 4, 5};
    int sum = std::accumulate(v.begin(), v.end(), 0);
    
    std::cout << "Computed sum: " << sum << std::endl;
    return 0;
}
`,
  },
  [LanguageMode.C]: {
    id: LanguageMode.C,
    name: 'C',
    pistonRuntime: 'c',
    pistonVersion: '10.2.0',
    filename: 'main.c',
    boilerplate: `// GCC 10.2.0
#include <stdio.h>

int main() {
    printf("Hello from CodeFlow!\\n");
    
    int sum = 0;
    for (int i = 0; i < 10; i++) {
        sum += i;
    }
    
    printf("Loop computation result: %d\\n", sum);
    return 0;
}
`,
  },
  [LanguageMode.GO]: {
    id: LanguageMode.GO,
    name: 'Go',
    pistonRuntime: 'go',
    pistonVersion: '1.16.2',
    filename: 'main.go',
    boilerplate: `// Go 1.16
package main

import "fmt"

func main() {
    fmt.Println("Hello from CodeFlow!")
    
    data := []int{10, 20, 30}
    total := 0
    for _, x := range data {
        total += x
    }
    
    fmt.Printf("Total: %d\\n", total)
}
`,
  },
  [LanguageMode.RUST]: {
    id: LanguageMode.RUST,
    name: 'Rust',
    pistonRuntime: 'rust',
    pistonVersion: '1.68.2',
    filename: 'main.rs',
    boilerplate: `// Rust 1.68
fn main() {
    println!("Hello from CodeFlow!");
    
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    
    println!("Sum: {}", sum);
}
`,
  },
  [LanguageMode.RUBY]: {
    id: LanguageMode.RUBY,
    name: 'Ruby',
    pistonRuntime: 'ruby',
    pistonVersion: '3.0.1',
    filename: 'main.rb',
    boilerplate: `# Ruby 3.0
class Greeter
  def initialize(name)
    @name = name
  end

  def say_hello
    puts "Hello #{@name} from CodeFlow!"
  end
end

g = Greeter.new("Developer")
g.say_hello
`,
  },
  [LanguageMode.PHP]: {
    id: LanguageMode.PHP,
    name: 'PHP',
    pistonRuntime: 'php',
    pistonVersion: '8.2.3',
    filename: 'main.php',
    boilerplate: `<?php
// PHP 8.2 CLI Mode
echo "Hello from CodeFlow PHP Runtime!\n";

$data = ['Apple', 'Banana', 'Cherry'];
foreach ($data as $fruit) {
    echo "Item: $fruit\n";
}
?>
`,
  },
  [LanguageMode.SWIFT]: {
    id: LanguageMode.SWIFT,
    name: 'Swift',
    pistonRuntime: 'swift',
    pistonVersion: '5.3.3',
    filename: 'main.swift',
    boilerplate: `// Swift 5.3
import Foundation

print("Hello from CodeFlow Swift!")

let numbers = [1, 2, 3, 4, 5]
let squared = numbers.map { $0 * $0 }

print("Squared numbers: \(squared)")
`,
  },
  [LanguageMode.BASH]: {
    id: LanguageMode.BASH,
    name: 'Bash',
    pistonRuntime: 'bash',
    pistonVersion: '5.2.0',
    filename: 'script.sh',
    boilerplate: `# Bash Shell
echo "Welcome to CodeFlow Shell"
echo "Current User: $(whoami)"
echo "Filesystem Check:"
ls -la
`,
  },
  [LanguageMode.SQL]: {
    id: LanguageMode.SQL,
    name: 'SQL',
    pistonRuntime: 'sqlite3',
    pistonVersion: '3.36.0',
    filename: 'query.sql',
    boilerplate: `-- SQLite3
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, role TEXT);
INSERT INTO users (name, role) VALUES ('Alice', 'Admin');
INSERT INTO users (name, role) VALUES ('Bob', 'User');

SELECT * FROM users;
`,
  },
};

export const THEMES: Record<string, Theme> = {
  COSMIC_GLASS: {
    id: 'cosmic_glass',
    name: 'Cosmic Glass',
    colors: {
      bgMain: '#1e1b4b', // Indigo 950
      bgPanel: 'rgba(49, 46, 129, 0.4)', // Indigo 900 alpha
      bgHeader: 'rgba(49, 46, 129, 0.6)',
      border: '#6366f1',
      textMain: '#e0e7ff',
      textDim: '#a5b4fc',
      accent: '#818cf8',
      accentHover: '#6366f1',
      success: '#34d399',
      error: '#f87171',
    },
    fonts: {
      ui: '"Space Grotesk", sans-serif',
      code: '"JetBrains Mono", monospace',
    },
    radius: '16px',
    glow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  },
  NEON_CITY: {
    id: 'neon_city',
    name: 'Neon City',
    colors: {
      bgMain: '#050511',
      bgPanel: '#0a0a1f',
      bgHeader: '#0f0f2d',
      border: '#d946ef',
      textMain: '#f0f9ff',
      textDim: '#94a3b8',
      accent: '#00ffff',
      accentHover: '#00cccc',
      success: '#00ff9d',
      error: '#ff0055',
    },
    fonts: {
      ui: '"Orbitron", sans-serif',
      code: '"Fira Code", monospace',
    },
    radius: '0px',
    glow: '0 0 15px rgba(217, 70, 239, 0.3)',
  },
  CYBERPUNK_2077: {
    id: 'cyberpunk_2077',
    name: 'Cyberpunk 2077',
    colors: {
      bgMain: '#fcee0a', // Cyberpunk Yellow
      bgPanel: '#000000',
      bgHeader: '#000000',
      border: '#000000',
      textMain: '#fcee0a', // Yellow text on black
      textDim: '#555555',
      accent: '#00e5ff', // Cyan
      accentHover: '#ffffff',
      success: '#00ff00',
      error: '#ff0000',
    },
    fonts: {
      ui: '"Orbitron", sans-serif',
      code: '"Share Tech Mono", monospace',
    },
    radius: '0px',
    glow: '4px 4px 0px rgba(0,0,0,0.2)', // Hard shadow
  },
  RETRO_HACKER: {
    id: 'retro_hacker',
    name: 'Hacker Terminal',
    colors: {
      bgMain: '#000000',
      bgPanel: '#0c0c0c',
      bgHeader: '#111',
      border: '#33ff00',
      textMain: '#33ff00',
      textDim: '#00aa00', // Brighter dim text for better readability
      accent: '#33ff00',
      accentHover: '#2ec200',
      success: '#33ff00',
      error: '#ff3300',
    },
    fonts: {
      ui: '"Share Tech Mono", monospace', // Cleaner than VT323
      code: '"Fira Code", monospace', // Cleaner than VT323
    },
    radius: '0px',
    glow: '0 0 10px rgba(51, 255, 0, 0.2)',
    isRetro: true,
  },
  SYNTHWAVE_84: {
    id: 'synthwave_84',
    name: 'Synthwave \'84',
    colors: {
      bgMain: '#241b2f', // Deep purple
      bgPanel: '#262335',
      bgHeader: '#1f1c2a',
      border: '#ff2a6d', // Hot pink
      textMain: '#fff',
      textDim: '#968da3',
      accent: '#05d9e8', // Neon blue
      accentHover: '#005678',
      success: '#00ff9d',
      error: '#ff0055',
    },
    fonts: {
      ui: '"Inter", sans-serif',
      code: '"Fira Code", monospace',
    },
    radius: '6px',
    glow: '0 0 8px rgba(255, 42, 109, 0.4)',
  },
  ROYAL_SCROLL: {
    id: 'royal_scroll',
    name: 'Royal Scroll',
    colors: {
      bgMain: '#f7f5f0', // Paper like
      bgPanel: '#ffffff',
      bgHeader: '#f0efe9',
      border: '#8b7355', // Bronze
      textMain: '#2d241e',
      textDim: '#6d5d50',
      accent: '#b45309', // Amber
      accentHover: '#92400e',
      success: '#15803d',
      error: '#b91c1c',
    },
    fonts: {
      ui: '"Cinzel", serif',
      code: '"JetBrains Mono", monospace',
    },
    radius: '4px',
    glow: 'none',
  },
  DRACULA_CASTLE: {
    id: 'dracula_castle',
    name: 'Dracula Castle',
    colors: {
      bgMain: '#282a36',
      bgPanel: '#44475a',
      bgHeader: '#44475a',
      border: '#bd93f9', // Purple
      textMain: '#f8f8f2',
      textDim: '#6272a4',
      accent: '#ff79c6', // Pink
      accentHover: '#ffb86c', // Orange
      success: '#50fa7b',
      error: '#ff5555',
    },
    fonts: {
      ui: '"Fira Code", monospace',
      code: '"Fira Code", monospace',
    },
    radius: '8px',
    glow: '0 0 0px',
  },
  JUNGLE_RAIN: {
    id: 'jungle_rain',
    name: 'Jungle Rain',
    colors: {
      bgMain: '#0d1f14', // Dark Green
      bgPanel: '#13291c',
      bgHeader: '#193624',
      border: '#2d6a4f',
      textMain: '#d8f3dc',
      textDim: '#74c69d',
      accent: '#52b788',
      accentHover: '#40916c',
      success: '#95d5b2',
      error: '#ff8c61',
    },
    fonts: {
      ui: '"Share Tech Mono", monospace',
      code: '"Share Tech Mono", monospace',
    },
    radius: '12px',
    glow: '0 0 20px rgba(45, 106, 79, 0.2)',
  },
  SOLARIZED_LIGHT: {
    id: 'solarized_light',
    name: 'Solarized Light',
    colors: {
      bgMain: '#fdf6e3',
      bgPanel: '#eee8d5',
      bgHeader: '#eee8d5',
      border: '#93a1a1',
      textMain: '#586e75',
      textDim: '#93a1a1',
      accent: '#b58900', // Yellow
      accentHover: '#cb4b16', // Orange
      success: '#859900',
      error: '#dc322f',
    },
    fonts: {
      ui: '"Inter", sans-serif',
      code: '"Fira Code", monospace',
    },
    radius: '4px',
    glow: 'none',
  },
  ABYSSAL_VOID: {
    id: 'abyssal_void',
    name: 'Abyssal Void',
    colors: {
      bgMain: '#000000',
      bgPanel: '#111111',
      bgHeader: '#0a0a0a',
      border: '#222222',
      textMain: '#e5e5e5',
      textDim: '#555555',
      accent: '#ffffff',
      accentHover: '#cccccc',
      success: '#ffffff',
      error: '#ffffff',
    },
    fonts: {
      ui: '"Inter", sans-serif',
      code: '"JetBrains Mono", monospace',
    },
    radius: '24px',
    glow: '0 0 40px rgba(255,255,255,0.05)',
  }
};