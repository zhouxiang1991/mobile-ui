const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  env : {
    jest                       : true,
    node                       : true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    '@vue/standard',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/typescript/recommended',
    'plugin:jsdoc/recommended',
  ],
  plugins      : ['jsdoc'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    /**
     * ts相关规则。
     */
    '@typescript-eslint/no-non-null-assertion': ['off'],
    /**
     * vue相关的规则
     */
    'vue/new-line-between-multi-line-property': ['off'],
    'vue/multi-word-component-names'          : ['off'],
    'vue/no-mutating-props'                   : ['off'],
    'vue/no-template-shadow'                  : ['off'],
    'vue/html-self-closing'                   : ['warn', {
      html: {
        void     : 'never',
        normal   : 'never',
        component: 'always',
      },
      svg : 'always',
      math: 'always',
    }],
    'vue/block-tag-newline'                : ['warn'],
    'vue/component-name-in-template-casing': [
      'warn',
      'PascalCase',
      {
        registeredComponentsOnly: true,
      },
    ],
    'vue/component-options-name-casing'     : ['warn'],
    'vue/custom-event-name-casing'          : ['warn'],
    'vue/no-child-content'                  : ['error'],
    'vue/no-duplicate-attr-inheritance'     : ['error'],
    'vue/no-invalid-model-keys'             : ['error'],
    'vue/no-multiple-objects-in-class'      : ['error'],
    'vue/no-potential-component-option-typo': ['error'],
    'vue/no-reserved-component-names'       : ['error'],
    'vue/no-static-inline-styles'           : ['off'],
    'vue/no-this-in-before-route-enter'     : ['error'],
    'vue/no-undef-components'               : ['error', {
      ignorePatterns: ['router-view'],
    }],
    'vue/no-undef-properties'                 : ['off'],
    'vue/no-unused-properties'                : ['off'],
    'vue/no-unused-refs'                      : ['off'],
    'vue/no-use-computed-property-like-method': ['error'],
    'vue/no-useless-mustaches'                : ['warn'],
    'vue/no-useless-v-bind'                   : ['warn'],
    'vue/no-v-text-v-html-on-component'       : ['error'],
    'vue/no-v-text'                           : ['error'],
    'vue/padding-line-between-blocks'         : ['warn'],
    'vue/prefer-separate-static-class'        : ['warn'],
    'vue/require-direct-export'               : ['error'],
    'vue/require-name-property'               : ['error'],
    'vue/script-indent'                       : ['off'],
    'vue/static-class-names-order'            : ['warn'],
    'vue/v-for-delimiter-style'               : ['warn'],
    'vue/v-on-function-call'                  : ['warn'],
    'vue/array-bracket-newline'               : ['warn', 'consistent'], // 在数组开括号后和闭括号前强制换行
    'vue/array-bracket-spacing'               : ['warn', 'never'], // 强制数组方括号中使用一致的空格
    'vue/arrow-spacing'                       : [
      'warn',
      {
        before: true,
        after : true,
      },
    ], // 要求箭头函数的箭头之前或之后有空格
    'vue/block-spacing': ['warn', 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'vue/brace-style'  : ['warn', '1tbs', { allowSingleLine: false }], // 强制在代码块中使用一致的大括号风格
    'vue/comma-dangle' : [
      'warn',
      {
        objects  : 'always-multiline',
        arrays   : 'always-multiline',
        imports  : 'always-multiline',
        exports  : 'always-multiline',
        functions: 'always-multiline',
      },
    ], // 要求或禁止末尾逗号
    'vue/comma-spacing': [
      'warn',
      {
        before: false,
        after : true,
      },
    ], // 强制在逗号周围使用空格
    'vue/comma-style' : ['warn', 'last'], // 逗号风格
    'vue/dot-location': ['warn', 'property'], // 强制在点号之前或之后换行
    'vue/dot-notation': [
      'warn',
      {
        allowKeywords: true,
        allowPattern : '',
      },
    ], // 要求使用点号
    'vue/eqeqeq'           : ['error', 'smart'], // 要求使用 === 和 !==
    'vue/func-call-spacing': ['warn', 'never'], // 要求或禁止在函数标识符和其调用之间有空格
    'vue/key-spacing'      : [
      'warn',
      {
        singleLine: {
          beforeColon: false,
          afterColon : true,
        },
        multiLine: {
          mode: 'minimum',
        },
      },
    ], // 强制在对象字面量的键和值之间使用一致的空格
    'vue/keyword-spacing': [
      'warn',
      {
        before: true,
        after : true,
      },
    ], // 强制在关键字前后使用一致的空格
    'vue/no-constant-condition'  : ['error', { checkLoops: false }], // 禁止在条件中使用常量表达式
    'vue/no-empty-pattern'       : ['error'], // 禁止使用空解构模式
    'vue/no-extra-parens'        : ['warn', 'functions'], // 禁止冗余的括号
    'vue/no-irregular-whitespace': ['error'], // 禁止不规则的空白
    'vue/no-restricted-syntax'   : [
      'error',
      'WithStatement',
      "BinaryExpression[operator='in']",
    ], // 禁止使用特定的语法
    'vue/no-sparse-arrays'    : ['error'], // 禁用稀疏数组
    'vue/no-useless-concat'   : ['error'], // 禁止没有必要的字符拼接
    'vue/object-curly-newline': [
      'warn',
      {
        consistent: true,
        multiline : true,
      },
    ], // 强制在花括号内使用一致的换行符
    'vue/object-curly-spacing'   : ['warn', 'always'], // 强制在花括号中使用一致的空格
    'vue/object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }], // 强制将对象的属性放在不同的行上
    'vue/object-shorthand'       : ['warn', 'always'], // 要求对象字面量简写语法
    'vue/operator-linebreak'     : [
      'warn',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ], // 强制操作符使用一致的换行符
    'vue/prefer-template': ['warn'], // 建议使用模板字面量而非字符串连接
    'vue/quote-props'    : ['warn', 'as-needed'], // 要求对象字面量属性名称使用引号
    'vue/space-in-parens': ['warn', 'never'], // 禁止或强制圆括号内的空格
    'vue/space-infix-ops': ['warn'], // 要求操作符周围有空格
    'vue/space-unary-ops': [
      'warn',
      {
        words   : true,
        nonwords: false,
      },
    ], // 要求或禁止在一元操作符之前或之后存在空格
    'vue/template-curly-spacing': ['warn', 'never'], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用

    /**
     * 这些规则是关于风格指南的，而且是非常主观的
     */
    'array-bracket-newline': ['warn', 'consistent'], // 在数组开括号后和闭括号前强制换行
    'array-bracket-spacing': ['warn', 'never'], // 强制数组方括号中使用一致的空格
    'array-element-newline': ['warn', 'consistent'], // 强制数组元素间出现换行
    'block-spacing'        : ['warn', 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'brace-style'          : ['warn', '1tbs', { allowSingleLine: false }], // 强制在代码块中使用一致的大括号风格
    camelcase              : [
      'error',
      {
        properties         : 'never', // 不允许出现非驼峰变量
        ignoreDestructuring: false, // 不忽略对象结构
        ignoreImports      : false, // 不忽略导入
      },
    ], // 强制使用骆驼拼写法命名约定
    'comma-dangle': [
      'warn',
      {
        objects  : 'always-multiline',
        arrays   : 'always-multiline',
        imports  : 'always-multiline',
        exports  : 'always-multiline',
        functions: 'always-multiline',
      },
    ], // 要求或禁止末尾逗号
    'comma-spacing': [
      'warn',
      {
        before: false,
        after : true,
      },
    ], // 强制在逗号周围使用空格
    'comma-style'              : ['warn', 'last'], // 逗号风格
    'computed-property-spacing': ['warn', 'never'], // 禁止或强制在计算属性中使用空格
    'consistent-this'          : ['off', 'self'], // 要求一致的this别名
    'eol-last'                 : ['warn', 'always'], // 要求或禁止文件末尾保留一行空行
    'func-call-spacing'        : ['warn', 'never'], // 要求或禁止在函数标识符和其调用之间有空格
    'func-name-matching'       : ['error', 'never'], // 要求函数名与赋值给它们的变量名或属性名相匹配
    'implicit-arrow-linebreak' : ['warn', 'beside'], // 强制隐式返回的箭头函数体的位置
    indent                     : [
      'warn',
      2,
      {
        SwitchCase         : 1,
        VariableDeclarator : 1,
        outerIIFEBody      : 1,
        MemberExpression   : 1,
        FunctionDeclaration: {
          parameters: 1,
          body      : 1,
        },
        FunctionExpression: {
          parameters: 1,
          body      : 1,
        },
        CallExpression        : { arguments: 1 },
        ArrayExpression       : 1,
        ObjectExpression      : 1,
        ImportDeclaration     : 1,
        flatTernaryExpressions: false,
        ignoreComments        : false,
        ignoredNodes          : ['TemplateLiteral *'],
      },
    ], // 强制使用一致的缩进
    'jsx-quotes' : ['warn', 'prefer-double'], // 强制在 JSX 属性中使用一致的单引号或双引号
    'key-spacing': [
      'warn',
      {
        singleLine: {
          beforeColon: false,
          afterColon : true,
        },
        multiLine: {
          mode : 'strict',
          align: 'colon',
        },
      },
    ], // 强制在对象字面量的键和值之间使用一致的空格
    'keyword-spacing': [
      'warn',
      {
        before: true,
        after : true,
      },
    ], // 强制在关键字前后使用一致的空格
    'line-comment-position': ['off', 'beside'], // 强制行注释的位置
    'linebreak-style'      : ['warn', 'unix'], // 强制使用一致的换行风格
    'lines-around-comment' : [
      'off',
      {
        beforeBlockComment: true,
        beforeLineComment : true,
        allowBlockStart   : true,
        allowObjectStart  : true,
        allowArrayStart   : true,
        allowClassStart   : true,
        afterBlockComment : false,
        afterLineComment  : false,
        allowBlockEnd     : false,
        allowObjectEnd    : false,
        allowArrayEnd     : false,
        allowClassEnd     : false,
      },
    ], // 强制注释周围有空行
    'lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: false },
    ], // 要求或禁止在类成员之间出现空行
    'max-depth': ['error', 6], // 强制块语句的最大可嵌套深度
    'max-len'  : [
      'error',
      {
        code                  : 200, // 代码长度
        tabWidth              : 2, // tab长度
        comments              : 80, // 注释长度
        ignoreComments        : true, // 忽略所有拖尾注释和行内注释
        ignoreTrailingComments: true, // 忽略拖尾注释
        ignoreUrls            : true, // 忽略含有链接的行
        ignoreStrings         : true, // 忽略含有双引号或单引号字符串的行
        ignoreTemplateLiterals: true, // 忽略包含模板字面量的行
        ignoreRegExpLiterals  : true, // 忽略包含正则表达式的行
      },
    ], // 强制行的最大长度
    'max-lines': [
      'error',
      {
        max           : 1000, // 强制一个文件的最大行数
        skipBlankLines: true, // 忽略空白行
        skipComments  : true, // 忽略只包含注释的行
      },
    ], // 强制文件的最大行数
    'max-lines-per-function': [
      'off', {
        max           : 100, // 函数最大代码行数
        skipBlankLines: true, // 忽略纯空格行
        skipComments  : true, // 忽略注射行
        IIFEs         : false,
      },
    ], // 强制函数最大行数
    'max-nested-callbacks'   : ['off', { max: 3 }], // 强制回调函数最大嵌套深度
    'max-params'             : ['error', { max: 4 }], // 限制函数定义中最大参数个数
    'max-statements'         : ['error', { max: 50 }], // 限制函数块中的语句的最大数量
    'max-statements-per-line': ['error', { max: 1 }], // 强制每一行中所允许的最大语句数量
    'multiline-comment-style': ['off'], // 强制对多行注释使用特定风格
    'multiline-ternary'      : ['error', 'always-multiline'], // 要求或禁止在三元操作数中间换行
    'new-cap'                : [
      'error',
      {
        newIsCap  : true, // 要求调用new操作符时有首字母大小的函数
        capIsNew  : false, // 允许调用首字母大写的函数时没有new操作符
        properties: true,
      },
    ], // 要求构造函数首字母大写
    'new-parens'              : ['warn', 'always'], // 要求调用无参构造函数时带括号
    'newline-per-chained-call': ['off', { ignoreChainWithDepth: 2 }], // 要求方法链中每个调用都有一个换行符
    'no-array-constructor'    : ['error'], // 禁止使用 Array 构造函数
    'no-bitwise'              : ['error'], // 禁止使用按位操作符
    'no-continue'             : ['off'], // 禁用 continue
    'no-inline-comments'      : ['off'], // 禁止使用内联注释
    'no-lonely-if'            : ['warn'], // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'no-mixed-operators'      : [
      'error',
      {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ], // 禁止混合使用不同的操作符
    'no-mixed-spaces-and-tabs': ['error'], // 禁止空格和 tab 的混合缩进
    'no-multi-assign'         : ['off'], // 禁止连续赋值
    'no-multiple-empty-lines' : [
      'warn',
      {
        max   : 1, // 强制最大连续空行数
        maxBOF: 0, // 强制文件开始的最大连续空行数
        maxEOF: 0, // 强制文件末尾的最大连续空行数
      },
    ], // 不允许多个空行
    'no-negated-condition': ['off'], // 禁用否定表达式
    'no-nested-ternary'   : ['off'], // 禁止使用嵌套的三元表达式
    'no-new-object'       : ['error'], // 禁止使用 Object 构造函数
    'no-plusplus'         : ['off', { allowForLoopAfterthoughts: true }], // 禁止使用一元操作符 ++ 和 --
    'no-restricted-syntax': [
      'error',
      'WithStatement',
      "BinaryExpression[operator='in']",
    ], // 禁止使用特定的语法
    'no-tabs'                         : ['error'], // 禁用 tab
    'no-ternary'                      : ['off'], // 禁止使用三元操作符
    'no-trailing-spaces'              : ['warn'], // 禁用行尾空白
    'no-underscore-dangle'            : ['off'], // 禁止标识符中有悬空下划线
    'no-unneeded-ternary'             : ['warn', { defaultAssignment: false }], // 禁止可以表达为更简单结构的三元操作符
    'no-whitespace-before-property'   : ['error'], // 禁止属性前有空白
    'nonblock-statement-body-position': ['warn', 'beside'], // 强制单个语句的位置
    'object-curly-newline'            : [
      'warn',
      {
        consistent: true,
        multiline : true,
      },
    ], // 强制在花括号内使用一致的换行符
    'object-curly-spacing'        : ['warn', 'always'], // 强制在花括号中使用一致的空格
    'object-property-newline'     : ['warn', { allowAllPropertiesOnSameLine: true }], // 强制将对象的属性放在不同的行上
    'one-var'                     : ['warn', 'never'], // 强制函数中的变量在一起声明或分开声明
    'one-var-declaration-per-line': ['warn', 'always'], // 要求或禁止在变量声明周围换行
    'operator-assignment'         : ['warn'], // 要求或禁止尽可能地简化赋值操作
    'operator-linebreak'          : [
      'warn',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ], // 强制操作符使用一致的换行符
    'padded-blocks': [
      'error',
      {
        blocks  : 'never',
        switches: 'never',
        classes : 'never',
      },
    ], // 要求或禁止块内填充
    'padding-line-between-statements': [
      'warn',
      /**
       * 关键字之前插入前空行
       */
      {
        blankLine: 'always',
        prev     : '*',
        next     : [
          'export',
          'return',
          'if',
          'switch',
          'case',
          'do',
          'while',
          'iife',
          'class',
          'for',
          'continue',
          'break',
          'debugger',
          'throw',
          'try',
        ],
      },

      /**
       * 多行导出之间不允许出现空行
       */
      {
        blankLine: 'never',
        prev     : ['export'],
        next     : ['export'],
      },

      /**
       * 单行或者多行变量声明之后插入空行
       */
      {
        blankLine: 'always',
        prev     : ['const', 'let', 'var'],
        next     : '*',
      },

      /**
       * 单行或者多行变量声明之前插入空行
       */
      {
        blankLine: 'always',
        prev     : '*',
        next     : ['const', 'let', 'var'],
      },

      /**
       * 多行变量声明之间不准出现空行
       */
      {
        blankLine: 'never',
        prev     : ['const', 'let', 'var'],
        next     : ['const', 'let', 'var'],
      },

      /**
       * 单行或多行表达式之前插入空行
       */
      {
        blankLine: 'always',
        prev     : '*',
        next     : 'expression',
      },

      /**
       * 多行表达式之前不准出现空行
       */
      {
        blankLine: 'never',
        prev     : 'expression',
        next     : 'expression',
      },

      /**
       * 单行或多行指令序言之后插入空行
       */
      {
        blankLine: 'always',
        prev     : 'directive',
        next     : '*',
      },

      /**
       * 多行指令序言之间不准出现空行
       */
      {
        blankLine: 'never',
        prev     : 'directive',
        next     : 'directive',
      },
    ], // 要求或禁止在语句间填充空行
    'prefer-object-spread': ['warn'], // 优先使用对象扩展而不是 Object.assign
    'quote-props'         : ['warn', 'as-needed'], // 要求对象字面量属性名称使用引号
    quotes                : [
      'warn',
      'single',
      {
        avoidEscape          : true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
        allowTemplateLiterals: false, // 允许字符串使用反勾号
      },
    ], // 强制使用一致的反勾号、双引号或单引号
    semi          : ['warn', 'never'], // 要求或禁止使用分号代替 ASI
    'semi-spacing': [
      'error',
      {
        before: false,
        after : true,
      },
    ], // 强制分号前后有空格
    'semi-style': ['warn', 'last'], // 强制分号的位置
    'sort-keys' : ['off', 'asc', {
      caseSensitive: true,
      natural      : false,
      minKeys      : 2,
    }], // 要求对象属性按序排列
    'sort-vars'                  : ['off', { ignoreCase: true }], // 变量排序
    'space-before-blocks'        : ['warn', 'always'], // 要求或禁止语句块之前的空格
    'space-before-function-paren': ['warn', 'always'], // 要求或禁止函数圆括号之前有一个空格
    'space-in-parens'            : ['warn', 'never'], // 禁止或强制圆括号内的空格
    'space-infix-ops'            : ['warn'], // 要求操作符周围有空格
    'space-unary-ops'            : [
      'warn',
      {
        words   : true,
        nonwords: false,
      },
    ], // 要求或禁止在一元操作符之前或之后存在空格
    'spaced-comment': [
      'warn',
      'always',
      {
        line : { markers: ['*package', '!', '/', ',', '='] },
        block: {
          balanced  : true,
          markers   : ['*package', '!', ',', ':', '::', 'flow-include'],
          exceptions: ['*'],
        },
      },
    ], // 要求或禁止在注释前有空白
    'switch-colon-spacing': ['warn', {
      after : true,
      before: true,
    }], // 强制在 switch 的冒号左右有空格
    'template-tag-spacing': ['warn', 'never'], // 要求或禁止在模板标记和它们的字面量之间有空格
    'unicode-bom'         : ['warn', 'never'], // 要求或禁止使用 Unicode 字节顺序标记 (BOM)
    'wrap-regex'          : ['warn'], // 要求正则表达式被包裹起来

    /**
     * 这些规则只与 ES6 有关, 即通常所说的 ES2015
     */
    'arrow-body-style': ['off', 'as-needed', { requireReturnForObjectLiteral: false }], // 要求箭头函数体使用大括号
    'arrow-parens'    : ['warn', 'as-needed', { requireForBlockBody: true }], // 要求箭头函数的参数使用圆括号
    'arrow-spacing'   : [
      'warn',
      {
        before: true,
        after : true,
      },
    ], // 要求箭头函数的箭头之前或之后有空格
    'constructor-super'     : ['error'], // 验证构造函数中 super() 的调用
    'generator-star-spacing': [
      'warn',
      {
        before: true,
        after : true,
      },
    ], // 强制 generator 函数中 * 号周围有空格
    'no-class-assign'        : ['error'], // 不允许修改类声明的变量
    'no-confusing-arrow'     : ['warn'], // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-const-assign'        : ['error'], // 不允许改变用const声明的变量
    'no-dupe-class-members'  : ['error'], // 不允许类成员中有重复的名称
    'no-duplicate-imports'   : ['error'], // 禁止重复导入
    'no-new-symbol'          : ['error'], // 禁止 Symbolnew 操作符和 new 一起使用
    'no-restricted-imports'  : ['off'], // 禁用特定的 import
    'no-this-before-super'   : ['error'], // 在构造函数中禁止在调用super()之前使用this或super
    'no-useless-computed-key': ['warn'], // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor' : ['off'], // 禁用不必要的构造函数
    'no-useless-rename'      : ['warn'], // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    'no-var'                 : ['warn'], // 要求使用 let 或 const 而不是 var
    'object-shorthand'       : ['warn', 'always'], // 要求对象字面量简写语法
    'prefer-arrow-callback'  : ['warn'], // 要求使用箭头函数作为回调
    'prefer-const'           : [
      'warn',
      {
        destructuring         : 'all',
        ignoreReadBeforeAssign: false,
      },
    ], // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-destructuring': ['warn', {
      array : true,
      object: false,
    }, { enforceForRenamedProperties: true }], // 优先使用数组和对象解构
    'prefer-numeric-literals': ['warn'], // 禁用 parseInt() 和 Number.parseInt()，使用二进制，八进制和十六进制字面量
    'prefer-rest-params'     : ['error'], // 建议使用剩余参数代替
    'prefer-spread'          : ['error'], // 建议使用扩展语法而非.apply()
    'prefer-template'        : ['warn'], // 建议使用模板字面量而非字符串连接
    'require-yield'          : ['error'], // 要求 generator 函数内有 yield
    'rest-spread-spacing'    : ['warn', 'never'], // 强制剩余和扩展运算符及其表达式之间有空格
    'sort-imports'           : [
      'warn',
      {
        ignoreCase           : false,
        ignoreMemberSort     : false,
        ignoreDeclarationSort: true,
      },
    ],
    'symbol-description'    : ['error'], // 要求 symbol 描述
    'template-curly-spacing': ['warn', 'never'], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'yield-star-spacing'    : ['warn', 'both'], // 强制在 yield* 表达式中 * 周围使用空格

    /**
     * 这些规则是关于Node.js 或 在浏览器中使用CommonJS 的
     */
    'callback-return'      : ['off'], // 强制返回callback函数
    'global-require'       : ['error'], // 强制在模块顶部调用 require()
    'handle-callback-err'  : ['error', '^(err|error)$'], // 强制回调错误处理
    'no-buffer-constructor': ['error'], // 禁用 Buffer() 构造函数
    'no-mixed-requires'    : ['error'], // 禁止 require 调用与普通变量声明混合使用
    'no-new-require'       : ['error'], // 不允许 new require
    'no-path-concat'       : ['error'], // 当使用 _dirname 和 _filename 时不允许字符串拼接
    'no-process-env'       : ['off'], // 禁用 process.env
    'no-process-exit'      : ['error'], // 禁用 process.exit()
    'no-restricted-modules': ['off'], // 禁止 Node.js 模块
    'no-sync'              : ['off'], // 禁止使用同步方法
    'no-unused-vars'       : [
      'error',
      {
        vars              : 'all',
        args              : 'none',
        ignoreRestSiblings: true,
      },
    ], // 禁止未使用过的变量
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes  : false,
        variables: false,
      },
    ], // 禁止定义前使用

    /**
     * 这些规则与变量声明有关
     */
    'init-declarations'         : ['off', 'always'], // 要求或禁止 var 声明中的初始化
    'no-delete-var'             : ['error'], // 禁止删除变量
    'no-label-var'              : ['error'], // 禁用与变量同名的标签
    'no-restricted-globals'     : ['off'], // 禁用特定的全局变量
    'no-shadow'                 : ['off'], // 禁止变量声明覆盖外层作用域的变量
    'no-shadow-restricted-names': ['error'], // 关键字不能被遮蔽
    'no-undef'                  : ['error'], // 禁用未声明的变量
    'no-undef-init'             : ['warn'], // 不允许初始化变量值为 undefined
    'no-undefined'              : ['off'], // 不允许使用undefined变量

    /**
     * 这些规则是关于最佳实践的，帮助你避免一些问题
     */
    'accessor-pairs'        : ['error'], // 强制getter/setter成对出现在对象中
    'array-callback-return' : ['error'], // 强制数组方法的回调函数中有 return 语句
    'block-scoped-var'      : ['error'], // 把 var 语句看作是在块级作用域范围之内
    'class-methods-use-this': ['error'], // 强制类方法使用 this
    complexity              : ['off', { max: 10 }], // 限制圈复杂度
    'consistent-return'     : ['error'], // 要求使用一致的 return 语句
    curly                   : ['warn', 'multi-line'], // 强制所有控制语句使用一致的括号风格
    'default-case'          : ['error'], // 要求 Switch 语句中有 Default 分支
    'dot-location'          : ['warn', 'property'], // 强制在点号之前或之后换行
    'dot-notation'          : [
      'warn',
      {
        allowKeywords: true,
        allowPattern : '',
      },
    ], // 要求使用点号
    eqeqeq                : ['error', 'smart'], // 要求使用 === 和 !==
    'guard-for-in'        : ['error'], // 需要约束 for-in
    'max-classes-per-file': ['off'], // 强制每个文件中包含的的类的最大数量
    'no-alert'            : ['error'], // 禁用 Alert
    'no-caller'           : ['error'], // 禁用 caller 或 callee
    'no-case-declarations': ['error'], // 禁止在 case 或 default 子句中出现词法声明
    'no-div-regex'        : ['warn'], // 禁止使用看起来像除法的正则表达式
    'no-else-return'      : ['off', { allowElseIf: true }], // 禁止在 else 前有 return
    'no-empty-function'   : ['off'], // 禁止出现空函数
    'no-empty-pattern'    : ['error'], // 禁止使用空解构模式
    'no-eq-null'          : ['error'], // 禁止与 null 进行比较
    'no-eval'             : ['error'], // 禁用 eval()
    'no-extend-native'    : ['error'], // 禁止扩展原生对象
    'no-extra-bind'       : ['warn'], // 禁止不必要的函数绑定
    'no-extra-label'      : ['warn'], // 禁用不必要的标签
    'no-fallthrough'      : ['off'], // 禁止 case 语句落空
    'no-floating-decimal' : ['warn'], // 禁止浮点小数
    'no-global-assign'    : ['error'], // 禁止对原生对象或只读的全局对象进行赋值
    'no-implicit-coercion': ['off', {
      string : true,
      boolean: true,
      number : true,
    }], // 禁止使用较短的符号实现类型转换
    'no-implicit-globals': ['error'], // 禁止在全局范围使用变量和函数声明
    'no-implied-eval'    : ['error'], // 禁用隐式的eval()
    'no-invalid-this'    : ['off'], // 禁止 this 关键字在类或类对象之外出现
    'no-iterator'        : ['error'], // 禁用迭代器
    'no-labels'          : [
      'error',
      {
        allowLoop  : false,
        allowSwitch: false,
      },
    ], // 禁用标签语句
    'no-lone-blocks'              : ['error'], // 禁用不必要的嵌套块
    'no-loop-func'                : ['off'], // 禁止循环中存在函数
    'no-magic-numbers'            : ['off', { ignoreArrayIndexes: true }], // 禁止使用魔术数字
    'no-multi-spaces'             : ['error'], // 禁止出现多个空格
    'no-multi-str'                : ['error'], // 禁止多行字符串
    'no-new'                      : ['error'], // 禁止使用 new 以避免产生副作用
    'no-new-func'                 : ['error'], // 禁用Function构造函数
    'no-new-wrappers'             : ['error'], // 禁止原始包装实例
    'no-octal'                    : ['error'], // 禁用八进制字面量
    'no-octal-escape'             : ['error'], // 禁止在字符串字面量中使用八进制转义序列
    'no-param-reassign'           : ['off', { props: false }], // 禁止对函数参数再赋值
    'no-proto'                    : ['error'], // 禁用__proto__
    'no-redeclare'                : ['error', { builtinGlobals: false }], // 禁止重新声明变量
    'no-restricted-properties'    : ['off'], // 禁止使用对象的某些属性
    'no-return-assign'            : ['error', 'except-parens'], // 禁止在返回语句中赋值
    'no-return-await'             : ['error'], // 禁用不必要的 return await
    'no-script-url'               : ['error'], // 禁用 Script URL
    'no-self-assign'              : ['error', { props: true }], // 禁止自身赋值
    'no-self-compare'             : ['error'], // 禁止自身比较
    'no-sequences'                : ['error'], // 不允许使用逗号操作符
    'no-throw-literal'            : ['error'], // 限制可以被抛出的异常
    'no-unmodified-loop-condition': ['error'], // 禁用一成不变的循环条件
    'no-unused-expressions'       : ['error', {
      allowShortCircuit   : true,
      allowTernary        : true,
      allowTaggedTemplates: true,
    }], // 禁止未使用过的表达式
    'no-unused-labels'            : ['warn'], // 禁用未使用过的标签
    'no-useless-call'             : ['error'], // 禁用不必要的 .call() 和 .apply()
    'no-useless-catch'            : ['error'], // 禁止不必要的 catch 子句
    'no-useless-concat'           : ['error'], // 禁止没有必要的字符拼接
    'no-useless-escape'           : ['error'], // 禁用不必要的转义
    'no-useless-return'           : ['warn'], // 禁止多余的 return 语句
    'no-void'                     : ['error'], // 禁止使用void操作符
    'no-warning-comments'         : ['off'], // 禁用警告注释
    'no-with'                     : ['error'], // 禁用 with 语句
    'prefer-named-capture-group'  : ['off'], // 建议在正则表达式中使用命名捕获组
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }], // 要求使用 Error 对象作为 Promise 拒绝的原因
    radix                         : ['error'], // 要求必须有基数
    'require-await'               : ['error'], // 禁止使用不带 await 表达式的 async 函数
    'require-unicode-regexp'      : ['off'], // 强制在 RegExp 上使用 u 标志
    'vars-on-top'                 : ['error'], // 要求将变量声明放在它们作用域的顶部
    'wrap-iife'                   : ['warn', 'inside', { functionPrototypeMethods: true }], // 需要把立即执行的函数包裹起来
    yoda                          : ['warn', 'never', {
      onlyEquality: false,
      exceptRange : false,
    }], // 要求或者禁止Yoda条件

    /**
     * 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关
     */
    'for-direction'                     : ['error'], // 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
    'getter-return'                     : ['error'], // 强制在 getter 属性中出现一个 return 语句
    'no-async-promise-executor'         : ['error'], // 禁止使用异步函数作为 Promise executor
    'no-await-in-loop'                  : ['off'], // 禁止在循环中 出现 await
    'no-compare-neg-zero'               : ['error'], // 禁止与 -0 进行比较
    'no-cond-assign'                    : ['error'], // 禁止在条件语句中出现赋值操作符
    'no-console'                        : [isProd ? 'error' : 'off'], // 禁用 console
    'no-constant-condition'             : ['error', { checkLoops: false }], // 禁止在条件中使用常量表达式
    'no-control-regex'                  : ['error'], // 禁止在正则表达式中使用控制字符
    'no-debugger'                       : [isProd ? 'error' : 'off'], // 禁用 debugger
    'no-dupe-args'                      : ['error'], // 禁止在 function 定义中出现重复的参数
    'no-dupe-keys'                      : ['error'], // 禁止在对象字面量中出现重复的键
    'no-duplicate-case'                 : ['error'], // 禁止重复 case 标签
    'no-empty'                          : ['error', { allowEmptyCatch: true }], // 禁止空块语句
    'no-empty-character-class'          : ['error'], // 禁止在正则表达式中出现空字符集
    'no-ex-assign'                      : ['error'], // 禁止对 catch 子句中的异常重新赋值
    'no-extra-boolean-cast'             : ['warn'], // 禁止不必要的布尔类型转换
    'no-extra-parens'                   : ['warn', 'functions'], // 禁止冗余的括号
    'no-extra-semi'                     : ['warn'], // 禁用不必要的分号
    'no-func-assign'                    : ['error'], // 禁止对 function 声明重新赋值
    'no-inner-declarations'             : ['error', 'functions'], // 禁止在嵌套的语句块中出现变量或 function 声明
    'no-invalid-regexp'                 : ['error'], // 止在 RegExp 构造函数中出现无效的正则表达式
    'no-irregular-whitespace'           : ['error'], // 禁止不规则的空白
    'no-misleading-character-class'     : ['error'], // 不允许在字符类语法中出现由多个代码点组成的字符
    'no-obj-calls'                      : ['error'], // 禁止将全局对象当作函数进行调用
    'no-prototype-builtins'             : ['error'], // 禁止直接使用 Object.prototypes 的内置属性
    'no-regex-spaces'                   : ['warn'], // 禁止正则表达式字面量中出现多个空格
    'no-sparse-arrays'                  : ['error'], // 禁用稀疏数组
    'no-template-curly-in-string'       : ['error'], // 禁止在常规字符串中出现模板字面量占位符语法
    'no-unexpected-multiline'           : ['error'], // 禁止使用令人困惑的多行表达式
    'no-unreachable'                    : ['error'], // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
    'no-unsafe-finally'                 : ['error'], // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-negation'                : ['warn'], // 禁止对关系运算符的左操作数使用否定操作符
    'require-atomic-updates'            : ['error'], // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
    'use-isnan'                         : ['error'], // 要求调用 isNaN()检查 NaN
    'valid-typeof'                      : ['error', { requireStringLiterals: false }], // 强制 typeof 表达式与有效的字符串进行比较
    /**
     * import风格相关
     */
    'import/order'                      : ['warn'], // 要求导入语句按照一定顺序排列
    'import/first'                      : ['warn'], // 要求导入语句之前没有其他语句
    'import/exports-last'               : ['off'], // 要求导入语句之后没有其他语句
    'import/no-duplicates'              : ['warn'], // 禁止同个文件多次导入相同的模块
    'import/no-namespace'               : ['off'], // 强制要求不能使用* as 语句
    'import/extensions'                 : ['off', 'never'], // 要求统一的导入文件后缀模式
    'newline-after-import'              : ['off'], // 要求导入语句后面是其他语句时在之后插入空行
    'import/prefer-default-export'      : ['off'], // 当文件只导出一个变量时，强制要求使用默认导出
    'import/max-dependencies'           : ['off'], // 要求单个文件最多导入依赖数量
    'import/no-unassigned-import'       : ['off'], // 要求配置允许导入未分配的模块列表
    'import/no-named-default'           : ['error'], // 不允许对默认到处使用as语法
    'import/no-default-export'          : ['off'], // 禁止使用默认导出
    'import/no-named-export'            : ['off'], // 禁止使用命名导出
    'import/no-anonymous-default-export': ['error', {
      allowArray            : true,
      allowArrowFunction    : true,
      allowAnonymousClass   : true,
      allowAnonymousFunction: true,
      allowCallExpression   : true,
      allowLiteral          : true,
      allowObject           : true,
    }], // 禁止部分表达式或常量的默认导出
    'import/group-exports'           : ['off'], // 要求多个命名导出，合并在一起分组导出
    'import/dynamic-import-chunkname': ['off'], // 动态导入要求chunkName有一定规则

    /**
     * import静态分析
     */
    'import/no-unresolved'             : ['error'], // 禁止导入无法加的模块
    'import/named'                     : ['off'], // 禁止不存在的命名导入
    'import/default'                   : ['error'], // 禁止不存在的默认导入
    'import/namespace'                 : ['error'], // 在as foo后，禁止访问foo中不存在的属性
    'import/no-restricted-paths'       : ['off'], // 禁止导入指定的模块
    'import/no-absolute-path'          : ['error'], // 禁止绝对路径导入
    'import/no-dynamic-require'        : ['error'], // 禁止动态require
    'import/no-internal-modules'       : ['off'], // 禁止导入其他默认的子模块
    'import/no-webpack-loader-syntax'  : ['off'], // 禁止使用webpack导入语法
    'import/no-self-import'            : ['error'], // 禁止模块导入自身
    'import/no-cycle'                  : ['error'], // 禁止循环导入
    'import/no-useless-path-segments'  : ['error'], // 禁止导入路径中不必要的路径片段
    'import/no-relative-parent-imports': ['off'], // 禁止导入父路径中的模块

    /**
     * import有帮助的警告
     */
    'import/export'                    : ['error'], // 禁止同名导出
    'import/no-named-as-default'       : ['error'], // 禁止已默认导入方式导入一个命名导出
    'import/no-named-as-default-member': ['error'], // 禁止在默认导入变量上方法命名导出变量
    'import/no-deprecated'             : ['error'], // 禁止导入一个带有@deprecated注释的变量
    'import/no-extraneous-dependencies': ['off'], // 禁止导入package.json中未声明的模块
    'import/no-mutable-exports'        : ['error'], // 禁止导出以let,var声明的变量
    'import/no-unused-modules'         : ['error'], // 禁止文件有任何导出

    /**
     * node相关。
     */
    'node/no-callback-literal': ['off'],

  },
  settings: {
    'import/extensions'             : ['.js', '.jsx', '.ts', '.tsx'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/parsers'                : {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
      alias: {
        map: [
          ['@', path.resolve(__dirname, 'src')],
        ],
        extensions: ['.ts', 'tsx', '.js', '.jsx', '.vue'],
      },
    },
  },
}
