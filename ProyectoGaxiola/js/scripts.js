// Lógica de conversión de Python a JavaScript
function convertPythonToJavaScript(pythonCode) {
    let jsCode = '';
    const lines = pythonCode.split('\n');
    let indentLevel = 0;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine === '') {
            return;
        }

        // Copiar comentarios
        if (trimmedLine.startsWith("#")) {
            jsCode += `${' '.repeat(indentLevel * 4)}${trimmedLine.replace("#", "//")}\n`;
            return;
        }

        // Cerrar bloques de código si es necesario
        if (['elif', 'else', 'for', 'while', 'def'].some(keyword => trimmedLine.startsWith(keyword))) {
            if (indentLevel > 0) {
                jsCode += `${' '.repeat((indentLevel - 1) * 4)}}\n`;
                indentLevel--;
            }
        }

        if (trimmedLine.includes("=") && !trimmedLine.includes("==")) {
            const parts = trimmedLine.split('=');
            const variableName = parts[0].trim();
            let value = parts[1].trim();

            // Convertir tuplas de Python a arrays de JavaScript
            if (value.startsWith("(") && value.endsWith(")")) {
                value = value.replace("(", "[").replace(")", "]");
            }

            jsCode += `${' '.repeat(indentLevel * 4)}let ${variableName} = ${value};\n`;
        } else if (trimmedLine.startsWith("if")) {
            const condition = trimmedLine.substring(2).trim().slice(0, -1);
            jsCode += `${' '.repeat(indentLevel * 4)}if (${condition}) {\n`;
            indentLevel++;
        } else if (trimmedLine.startsWith("elif")) {
            const condition = trimmedLine.substring(4).trim().slice(0, -1);
            jsCode += `${' '.repeat(indentLevel * 4)}else if (${condition}) {\n`;
            indentLevel++;
        } else if (trimmedLine.startsWith("else")) {
            jsCode += `${' '.repeat(indentLevel * 4)}else {\n`;
            indentLevel++;
        } else if (trimmedLine.startsWith("for")) {
            const [loopVar, loopRange] = trimmedLine.replace("for", "").split("in").map(s => s.trim());
            const rangeValue = loopRange.replace("range(", "").replace(")", "");
            jsCode += `${' '.repeat(indentLevel * 4)}for (let ${loopVar} = 0; ${loopVar} < ${rangeValue}; ${loopVar}++) {\n`;
            indentLevel++;
        } else if (trimmedLine.startsWith("while")) {
            const condition = trimmedLine.substring(5).trim().slice(0, -1);
            jsCode += `${' '.repeat(indentLevel * 4)}while (${condition}) {\n`;
            indentLevel++;
        } else if (trimmedLine.startsWith("def")) {
            const funcNameWithParams = trimmedLine.substring(3).trim().slice(0, -1);
            const [funcName, params] = funcNameWithParams.split('(');
            jsCode += `${' '.repeat(indentLevel * 4)}function ${funcName}(${params.trim()}) {\n`;
            indentLevel++;
        } else if (trimmedLine.startsWith("print")) {
            const toPrint = trimmedLine.substring(5).trim().slice(1, -1);
            jsCode += `${' '.repeat(indentLevel * 4)}console.log(${toPrint});\n`;
        } else if (trimmedLine.startsWith("return")) {
            const returnValue = trimmedLine.substring(6).trim();
            jsCode += `${' '.repeat(indentLevel * 4)}return ${returnValue};\n`;
        } else if (trimmedLine.startsWith("class")) {
            const className = trimmedLine.substring(5).trim().slice(0, -1);
            jsCode += `${' '.repeat(indentLevel * 4)}class ${className} {\n`;
            indentLevel++;
        } else {
            jsCode += `${' '.repeat(indentLevel * 4)}${trimmedLine}\n`;
        }
    });

    // Cerrar bloques abiertos
    while (indentLevel > 0) {
        jsCode += `${' '.repeat((indentLevel - 1) * 4)}}\n`;
        indentLevel--;
    }

    return jsCode;
}
// Lógica de conversión de Python a C#
function convertPythonToCSharp(pythonCode) {
    let csCode = '';
    const lines = pythonCode.split('\n');
    let indentLevel = 0;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine === '') {
            return;
        }

        // Copiar comentarios
        if (trimmedLine.startsWith("#")) {
            csCode += `${' '.repeat(indentLevel * 4)}${trimmedLine.replace("#", "//")}\n`;
            return;
        }

        // Cerrar bloques de código si es necesario (por ejemplo, en bucles, condicionales, etc.)
        if (['elif', 'else', 'for', 'while', 'def'].some(keyword => trimmedLine.startsWith(keyword))) {
            if (indentLevel > 0) {
                csCode += `${' '.repeat((indentLevel - 1) * 4)}}\n`;
                indentLevel--;
            }
        }

        // Asignaciones (let x = 5 -> int x = 5)
        if (trimmedLine.includes("=") && !trimmedLine.includes("==")) {
            const parts = trimmedLine.split('=');
            const variableName = parts[0].trim();
            let value = parts[1].trim();

            // Convertir tuplas de Python a arrays de C#
            if (value.startsWith("(") && value.endsWith(")")) {
                value = value.replace("(", "{").replace(")", "}");
            }

            // Asumimos que las variables son de tipo int, puedes extender esto para manejar más tipos
            csCode += `${' '.repeat(indentLevel * 4)}int ${variableName} = ${value};\n`;
        }

        // Condicionales (if)
        else if (trimmedLine.startsWith("if")) {
            const condition = trimmedLine.substring(2).trim().slice(0, -1);
            csCode += `${' '.repeat(indentLevel * 4)}if (${condition}) {\n`;
            indentLevel++;
        }

        // Condicionales (elif -> else if)
        else if (trimmedLine.startsWith("elif")) {
            const condition = trimmedLine.substring(4).trim().slice(0, -1);
            csCode += `${' '.repeat(indentLevel * 4)}else if (${condition}) {\n`;
            indentLevel++;
        }

        // Condicionales (else)
        else if (trimmedLine.startsWith("else")) {
            csCode += `${' '.repeat(indentLevel * 4)}else {\n`;
            indentLevel++;
        }

        // Bucles for (for i in range(n): -> for (int i = 0; i < n; i++))
        else if (trimmedLine.startsWith("for")) {
            const [loopVar, loopRange] = trimmedLine.replace("for", "").split("in").map(s => s.trim());
            const rangeValue = loopRange.replace("range(", "").replace(")", "");
            csCode += `${' '.repeat(indentLevel * 4)}for (int ${loopVar} = 0; ${loopVar} < ${rangeValue}; ${loopVar}++) {\n`;
            indentLevel++;
        }

        // Bucles while
        else if (trimmedLine.startsWith("while")) {
            const condition = trimmedLine.substring(5).trim().slice(0, -1);
            csCode += `${' '.repeat(indentLevel * 4)}while (${condition}) {\n`;
            indentLevel++;
        }

        // Funciones (def -> void por defecto, o puedes modificar para incluir tipos de retorno)
        else if (trimmedLine.startsWith("def")) {
            const funcNameWithParams = trimmedLine.substring(3).trim().slice(0, -1);
            const [funcName, params] = funcNameWithParams.split('(');
            const csParams = params.trim().replace(/:/g, "").split(",").map(param => "int " + param.trim()).join(", ");
            csCode += `${' '.repeat(indentLevel * 4)}void ${funcName.trim()}(${csParams}) {\n`;
            indentLevel++;
        }

        // Print -> Console.WriteLine
        else if (trimmedLine.startsWith("print")) {
            const toPrint = trimmedLine.substring(5).trim().slice(1, -1);
            csCode += `${' '.repeat(indentLevel * 4)}Console.WriteLine(${toPrint});\n`;
        }

        // Return
        else if (trimmedLine.startsWith("return")) {
            const returnValue = trimmedLine.substring(6).trim();
            csCode += `${' '.repeat(indentLevel * 4)}return ${returnValue};\n`;
        }

        // Clases (class -> class)
        else if (trimmedLine.startsWith("class")) {
            const className = trimmedLine.substring(5).trim().slice(0, -1);
            csCode += `${' '.repeat(indentLevel * 4)}class ${className} {\n`;
            indentLevel++;
        }

        // Otro código
        else {
            csCode += `${' '.repeat(indentLevel * 4)}${trimmedLine}\n`;
        }
    });

    // Cerrar bloques abiertos
    while (indentLevel > 0) {
        csCode += `${' '.repeat((indentLevel - 1) * 4)}}\n`;
        indentLevel--;
    }

    return csCode;
}
// Función para convertir de JavaScript a Python
function convertJSToPython(jsCode) {
    // Eliminar palabras clave de declaración de variables (let, const, var)
    let pythonCode = jsCode.replace(/\b(let|const|var)\b/g, '');

    // Convertir funciones de `function nombre()` a `def nombre():`
    pythonCode = pythonCode.replace(/function\s+(\w+)\s*\((.*?)\)\s*{/g, 'def $1($2):');

    // Convertir `if`, `else if`, y `else`
    pythonCode = pythonCode.replace(/\bif\s*\((.*?)\)\s*{/g, 'if $1:');
    pythonCode = pythonCode.replace(/\belse if\s*\((.*?)\)\s*{/g, 'elif $1:');
    pythonCode = pythonCode.replace(/\belse\b\s*{/g, 'else:');

    // Convertir `for` loops de `for (let i = 0; i < n; i++)` a `for i in range(0, n):`
    pythonCode = pythonCode.replace(/for\s*\((let|var)?\s*(\w+)\s*=\s*(\d+);\s*\2\s*<\s*(\d+);\s*\2\+\+\)\s*{/g, 'for $2 in range($3, $4):');

    // Convertir `while` loops
    pythonCode = pythonCode.replace(/while\s*\((.*?)\)\s*{/g, 'while $1:');

    // Convertir `console.log` a `print`
    pythonCode = pythonCode.replace(/console\.log/g, 'print');

    // Convertir comentarios de `//` a `#`
    pythonCode = pythonCode.replace(/\/\//g, '#');

    // Convertir comentarios multilínea de `/* ... */` a `''' ... '''`
    pythonCode = pythonCode.replace(/\/\*/g, "'''");
    pythonCode = pythonCode.replace(/\*\//g, "'''");

    // Eliminar `}`
    pythonCode = pythonCode.replace(/}/g, '');

    return pythonCode;
}

// Función para convertir de C# a Python
function convertCSharpToPython(csharpCode) {
    // Paso 1: Remover 'using' statements
    csharpCode = csharpCode.replace(/using\s+[a-zA-Z0-9_.]+;/g, "");

    // Paso 2: Remover 'namespace' y 'class' (no son necesarios en Python)
    csharpCode = csharpCode.replace(/namespace\s+[a-zA-Z0-9_]+\s*{/, "");
    csharpCode = csharpCode.replace(/public\s+class\s+\w+\s*{/, "");

    // Paso 3: Eliminar 'public' o 'private' de los métodos (no se usa en Python)
    csharpCode = csharpCode.replace(/\b(public|private|protected)\s+/g, "");

    // Paso 4: Reemplazar 'Main' por 'main' en la función principal (si está presente)
    csharpCode = csharpCode.replace(/\bMain\b/g, "main");

    // Paso 5: Convertir métodos de C# a funciones en Python
    csharpCode = csharpCode.replace(/\bstatic\s+void\b/g, "def");
    csharpCode = csharpCode.replace(/\bvoid\b/g, "def");
    csharpCode = csharpCode.replace(/\bstring\b/g, "");
    csharpCode = csharpCode.replace(/\bint\b/g, "");
    csharpCode = csharpCode.replace(/\bbool\b/g, "");
    csharpCode = csharpCode.replace(/\bConsole\.WriteLine\b/g, "print");

    // Paso 6: Cambiar llaves '{' y '}' por indentación y eliminar líneas innecesarias
    csharpCode = csharpCode.replace(/{/g, ":");
    csharpCode = csharpCode.replace(/}/g, "");

    // Paso 7: Reemplazar 'true' y 'false' por 'True' y 'False' en Python
    csharpCode = csharpCode.replace(/\btrue\b/g, "True");
    csharpCode = csharpCode.replace(/\bfalse\b/g, "False");

    // Paso 8: Convertir ciclos for (suponiendo estructura típica 'for (int i = 0; i < n; i++)')
    csharpCode = csharpCode.replace(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+);\s*\1\s*<\s*(\d+);\s*\1\+\+\s*\)/g, (match, varName, start, end) => {
        return `for ${varName} in range(${start}, ${end}):`;
    });

    // Paso 9: Convertir ciclos while manteniendo la estructura
    csharpCode = csharpCode.replace(/\bwhile\s*\((.*?)\)/g, "while $1:");

    // Paso 10: Ajustar comentarios y remover espacios extras
    csharpCode = csharpCode.replace(/\/\/(.*)/g, "#$1");  // Comentarios de una línea
    csharpCode = csharpCode.replace(/\/\*(.*?)\*\//gs, '"""$1"""'); // Comentarios de varias líneas

    // Eliminar líneas en blanco extras
    csharpCode = csharpCode.replace(/^\s*[\r\n]/gm, "");

    return csharpCode.trim();
}



// Lógica para manejar la interacción del usuario
document.getElementById('convertButton').addEventListener('click', () => {
    const inputLanguage = document.getElementById('inputLanguage').value;
    const outputLanguage = document.getElementById('outputLanguage').value;   

    const codeInput = document.getElementById('codeInput').value;

    let convertedCode = '';

    if (inputLanguage === 'python' && outputLanguage === 'csharp') {
        convertedCode = convertPythonToCSharp(codeInput);
    } else if (inputLanguage === 'python' && outputLanguage === 'javascript') {
        convertedCode = convertPythonToJavaScript(codeInput);
    } else if (inputLanguage === 'javascript' && outputLanguage === 'python') {
        convertedCode = convertJSToPython(codeInput);
    } else if (inputLanguage === 'csharp' && outputLanguage === 'python') {
        convertedCode = convertCSharpToPython(codeInput);
    }else {
        convertedCode = 'La conversión entre estos lenguajes no está soportada aún.';
    }

    document.getElementById('codeOutput').value = convertedCode;
});

