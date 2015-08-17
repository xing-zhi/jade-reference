Jade Reference

# attributes
Jade标签属性在位于紧跟标签的圆括号中指定，属性值是**JavaScript表达式**。多个属性可以跨行。

{% highlight javascript %}
input(type='text', name='foo')

// 使用除字符串外的其它JavaScript表达式
- var authenticated = true
body(class=authenticated ? 'authed' : 'anon')

// 多个属性跨多行表示
input(
  type='checkbox'
  name='agreement'
  checked
  )
{% endhighlight %}

## 非转义属性
默认情况下，为了防止攻击，比如跨站脚本攻击，所有的标签属性值都是被转义的。如果某些字符不被转义，使用`！=`代替`=`。

{% highlight javascript %}
div(escaped="<code>")
div(unescaped!="<code>")
{% endhighlight %}

### 危险提示
未转义的缓冲代码是危险的，必须对用户的输入进行验证以防止跨站脚本攻击。

## 布尔属性
对于布尔属性，出现即表示指定该属性，同时接受布尔值。当doctype不是html时，当结果是指定该属性时，该属性名会被自动添加为属性值。（这里只显示doctype为html是生成的HTML代码。）

{% highlight javascript %}
input(type='checkbox', checked)
input(type='checkbox', checked=true)
input(type='checkbox', checked=false)
{% endhighlight %}

## 样式属性
样式属性既可以使用字符串形式指定，也可以使用对象形式指定。

{% highlight javascript %}
//- 字符串形式指定样式属性
p(style='color:red;background:green')

//- 对象形式指定样式属性
p(style={color: 'red', background: 'green'})
{% endhighlight %}

## 类属性
类属性可以是字符串、数组或者属性名为类名，属性值为布尔值的对象。Jade还支持同时指定多个类属性，它们会被合并到一起。

{% highlight javascript %}
//- 字符串形式指定类属性
p(class='foo bar baz')

//- 数组形式指定类属性
- var classes=['foo', 'bar', 'baz']
p(class=classes)

//- 对象形式制定类属性
- var currentUrl='/about'
a(class={atcive: currentUrl === '/'} href='/') Home
a(class={active: currentUrl === '/about'} href='/about') About

//- 指定多个class属性
p(class='foo' class=['bar', 'baz'])
{% endhighlight  %}

## 类和ID简写
可以使用CSS形式指定类属性和ID。同时因为`div`是最常用的元素标签，所以在使用类或ID简写时，如果省略元素标签，将使用`div`。

{% highlight javascript %}
//- 类属性简写
div.foo
div.foo.bar.baz

//- ID简写
div#foo

//- 使用简写时，省略元素标签，默认使用div
.foo
.foo.bar.baz

#foo
{% endhighlight  %}

## &attributes
&attributes接受一个对象作为参数，将该对象的每一个属性作为元素属性添加到元素中。

{% highlight javascript %}
p#foo&attributes({'data-foo': 'foo', 'data-bar': 'bar'})

//- 也可以是值为对象的JavaScript表达式
- attributes = {'data-foo': 'foo', 'data-bar': 'bar'}
p#foo&attributes(attributes)
{% endhighlight  %}

### 危险提示
使用&attributes添加的属性并没有被自动转义，需要对用户输入进行验证以防止跨站脚本攻击。

# case
Jade中的`case`语句类似JavaScript中的`swtich`语句，只是使用`case-when`而不是`switch-case`，同时不使用`break`。支持`fall through`和标签块扩展。

{% highlight javascript %}
- var friends = 10
case friends
  when 0
    p you have no friends
  when 1
    p you have a friend
  default
    p you have #{friends} friends

// fall through
- var friends = 0
case friends
  when 0
  when 1
    p you have very few friends
  default
    p you have #{friends} friends

// 块扩展
- var friends = 1
case friends
  when 0: p you have no friends
  when 1: p you have a friend
  default: p you have #{friends} friends
{% endhighlight %}

# code
在Jade模板中，支持3种形式的JavaScript代码。

## 不缓冲的代码
不缓冲的代码就是在编译后的HTML中不产生直接输出的JavaScript代码，以连字符作为第一个非空白字符表示。要实现跨行，只需要对后续行进行缩进即可。

{% highlight javascript %}
- for (var x = 0; x < 3; x++)
  li item

-
  list = ["Uno", "Dos", "Tres",
          "Cuatro", "Cinco", "Seis"]
each item in list
  li= item
{% endhighlight %}

## 缓冲的代码
缓冲的代码即JavaScript表达式的值被计算后会被输出到编译后的HTML文件中的代码，以等号作为第一个非空白字符表示。也可以在元素标签后紧跟等号。支持任何JavaScript代码。处于安全考虑，结果都被转义。

{% highlight javascript %}
p
  = 'This code is <escaped>!'

// 行内形式
p= 'This code is <escaped>!'
{% endhighlight %}

## 不转义的缓冲的代码
对缓冲的代码不进行转义。使用`!=`代替`=`即可。

{% highlight javascript %}
p
  != 'This code is <strong>not</strong> escaped!'

// 行内形式
p!= 'This code is <strong>not</strong> escaped!'
{% endhighlight %}

### 危险提示
不转义的缓冲代码是危险的，要对用户的输入进行检查，防止跨网站脚本攻击。

# comments
Jade支持单行注释、块注释和条件注释。

## 单行注释和块注释
Jade使用与JavaScript中相同的单行注释语法表示单行注释。当不希望某个注释被编译到HTML文件中时，在注释符后紧跟一个连字符（`-`）就可以了。当注释跨越多行时，只需要对后续行进行缩进就可以了。

{% highlight javascript %}
// single line comment
p foo

//- gingle line comment, but will only be existed in Jade file
p foo

// multiline comments
  multiline comments
  multiline comments
p foo
{% endhighlight %}

## 条件注释
Jade没有为条件注释提供特别的语法，因为所有以`<`开始的行都被当作纯文本看待，所以只需要使用正常的HTML条件注释就可以了。

{% highlight javascript %}
<!--[if IE 8]>
<html lang="en" class="lt-ie9">
<![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->
{% endhighlight %}

# conditionals
Jade中可以通过`if`、`else if`、`else`和`unless`表示条件，用于标记代码的前导连接符（`-`）和条件表达式的括号都可以被省略。

{% highlight javascript %}
- var user = { description: 'foo bar baz' }
- var authorised = false
.user
  if user.description
    h2 Description
    p.description= user.description
  else if authorised
    h2 Description
    p.description.
      User has no description,
      why not add one...
  else
    h1 Description
    p.description User has no description

// unless是if取反
unless user.isAnonymous
  p You're logged in as #{user.name}

// 上面的unless等价于
if !user.isAnonymous
  p You're logged in as #{user.name}
{% endhighlight %}

# doctype
doctype字符串后跟实际的doctype，两者以空白字符隔开。Jade提供了很多doctype简写，同时支持自定义doctype。这里只以HTML5的doctype举例，关于doctype简写请参考[官方文档](http://jade-lang.com/reference/doctype/)。

{% highlight javascript %}
doctype html
{% endhighlight %}

# extends & template inheritance
Jade提供了`extends`指令用于通过重写或改写预先定义的内容块扩充模板。

内容块通过`block`关键字，内容块名和可选的内容定义，内容块的内容即后续的缩进块。内容块中可以包含内容块。

在扩充模板过程中，既可以对其中的内容块进行替换，也可以给其中的内容块添加前置内容或者附加内容。替换内容通过定义一个同名内容块实现；添加前置内容或者附加内容通过定义前置块或者附加块实现。前置块通过`block prepend`定义，附加块通过`block append`定义。定义前置块和附加块时，`block`是可选的。

{% highlight javascript %}
//- layout.jade
doctype html
html
  head
    block head
      meta(charset='utf-8')
  body
    block header
      h1 My Site
    block content
      p Welcome to my site
    block footer
      p Copyright &copy; #{siteName}
{% endhighlight %}

{% highlight javascript %}
//- page.jade
extends layout

append head
  title Awesome Site

block header
  h1 Awesome Site

block content
  p Welcome to this awesome site
  p You can learn something about Jade here

prepend footer
  p Any error please contact @#{author}
{% endhighlight %}

# filters
过滤器使我们可以在Jade模板中使用其他语言，它们接受纯文本块作为输入。

所有的[JSTransformers](https://www.npmjs.com/browse/keyword/jstransformer)都可以用做Jade的过滤器，其中常用的有：`:coffee-script`, `:babel`, `:uglify-js`, `:less`和 `:markdown-it`。

Transformers.markdown is deprecated, you must replace the :markdown jade filter, with :marked and install jstransformer-marked before you update to jade@2.0.0.

{% highlight javascript %}
:markdown
  # Markdown

  I often like including markdown documents.
script
  :coffee-script
    console.log 'This is coffee script'
{% endhighlight %}

## Warning
过滤器是编译时，这使得它们很快，同时也意味着它们不支持动态内容。

内置的过滤器在浏览器中不存在，所以使用了过滤器的Jade模板需要在服务器端编译后用于浏览器中。

# includes
Jade提供了`include`指令用于在Jade文件中插入其他文件，包括Jade文件，纯文本和过滤器文件。

## 插入其他jade文件
示例

## 插入纯文本文件
示例

## 插入过滤器文件
示例

# interpolation
Jade提供了3种插值操作。

## 转义的字符串插值
任何在`#{}`中的JavaScript表达式都会被计算并且被相应的值替换，并且其中的特殊字符被转义。当某个元素的内容是某个JavaScript表达式时，可以使用简写形式：在元素标签后紧跟一个等号（`=`），然后是空白字符隔开的JavaScript表达式。

{% highlight javascript %}
- var title = "On Dogs: Man's Best Friend";
- var author = "enlore";
- var theGreat = "<span>escape!</span>";

h1= title
p Written with love by #{author}
p This will be safe: #{theGreat}

- var msg = "not my inside voice";
p This is #{msg.toUpperCase()}
{% endhighlight %}

## 不转义的字符串插值
当需要JavaScript表达式的值中的特殊字符不被转义时，使用`!{}`替换`#{}`；而简写形式时`！=`替换`=`。

{% highlight javascript %}
- var riskyBusiness = "<em>Some of the girls are wearing my mother's clothing.</em>";
.quote
  p Joel: !{riskyBusiness}
{% endhighlight %}

### 危险提示
在不转义的情况下，当插值内容来自用户输入时，可能带来安全隐患。

## 元素标签插值
当需要插入HTML元素时，只需要把元素标签声明放在`#[]`中即可，当然，也可以使用相应的HTML。

{% highlight javascript %}
p.
  There is a #[strong strong tag] in this paragraph.

// 直接使用HTML而不是元素标签插值
p.
  There is a <strong>strong tag</strong> in this paragraph.
{% endhighlight %}

# iteration
Jade支持两种迭代：`each...in`和`while`，其中可以使用`for`作为`each`的别名。

## each
`each...in`可以用来对数组和对象进行迭代，默认情况下是对值进行迭代，这与`for...in`不同，而和`ES6`中的`for...of`相同；还可以通过指定第二个变量来获取数组索引或者对象属性名。被迭代的对象可以是数组或字面值，也可以是结果为数组或对象的任何JavaScript表达式。可以使用`for`作为`each`的别名。

{% highlight javascript %}
// 对数组进行迭代
ul
  for v in [1, 2, 3]
    li= v

// 对对象进行迭代
ul
  for v in {1: 'one', 2: 'two', 3: 'three'}
    li= v

// 对数组进行迭代，并且获取索引
ul
  for v, i in [1, 2, 3]
    li= i + ': ' + v

// 对对象进行迭代，并且获取属性名
ul
  for v, k in {1: 'one', 2: 'two', 3: 'three'}
    li= k + ': ' + v

// 对值为数组/对象的JavaScript表达式进行迭代
- var values = [];
ul
  each v in values.length ? values : ['There are no values']
    li= v
{% endhighlight %}

## while
`while`用于创建循环，和JavaScript中的`while`类似。

{% highlight javascript %}
- var n = 0
ul
  while n < 4
    li= n++
{% endhighlight %}

# mixins
mixin用于创建可重用的Jade块。mixin由mixin关键字，mixin名和一到多行Jade代码组成的mixin体组成。mixin可以接受参数，并且将被编译成函数。在使用时，在mixin前添加加号（`+`）。
{% highlight javascript %}
//- Declaration
mixin list
  ul
    li foo
    li bar
    li baz
// 不带参数的mixin
+list

mixin pet(name)
  li.pet= name

// 带参数的mixin
ul
  +pet('cat')
  +pet('dog')
{% endhighlight %}

## mixin块
mixin可以接受Jade块作为内容，Jade块就是紧跟在”调用“mixin后的一到多行缩进的Jade代码。

{% highlight javascript %}
mixin article(title)
  .article
    .article-wrapper
      h1= title
      if block
        block
      else
        p No content provided

+article('Hello world')

+article('Hello world')
  p This is my
  p Amazing article
{% endhighlight %}

## mixin属性
mixin会自动获取一个参数`attributes`，就像JavaScript中函数会自动获取`arugments`和`this`一样。`attributes`的值通过在正常调用mixin后跟一个圆括号，然后在其中指定属性。`attributes`的值默认被转义，如果要不被转义，需要使用`!=`代替`=`。也可以使用`&attributes`。

{% highlight javascript %}
mixin link(href, name)
  //- attributes == {class: "btn"}
  a(class!=attributes.class, id=attributes.id, href=href)= name

+link('/foo', 'foo')(class='foo', id='bar')

// 使用&attributes
mixin link(href, name)
  a(href=href)&attributes(attributes)= name

+link('/foo', 'foo')(class="btn")
{% endhighlight %}

## 剩余参数
就和`ES6`中的剩余参数一样。

{% highlight javascript %}
mixin list(id, ...items)
  ul(id=id)
    each item in items
      li= item

+list('my-list', 1, 2, 3, 4)
{% endhighlight %}

# plain text
Jade中有3种方式表示纯文本，分别用于不同的情景。

## 管道文本（Piped text）
如果在文本前添加管道符，即`|`，那么这一行被当作纯文本。即如果某一行的第一个非空白字符是管道符，那么这一行就是纯文本。（管道文本必须单独占一行。）管道符和文本之间可以添加可选的空白字符。

{% highlight javascript %}
|Plain Text
| Plain Text
p
  | Plain text in a paragraph
{% endhighlight %}

## 行内文本（Inline in a Tag）
在标签后以空白字符隔开的文本会被当作纯文本，即如果元素标签和文本之间只有空白字符，则文本被当作纯文本。

{% highlight javascript %}
p Plain text in a paragraph
{% endhighlight %}

## 块文本（Block in a Tag）
如果元素标签后紧跟英文句点，那么后面缩进的文本都会被当作这个元素内嵌的纯文本。

{% highlight javascript %}
script.
  if (usingJade)
    console.log('you are awesome')
  else
    console.log('use jade')

// 如果使用管道文本，则要麻烦不少
script
  | if (usingJade)
  |   console.log('you are awesome')
  | else
  |   console.log('use jade')
{% endhighlight %}

# tags
默认情况下，一行中的第一个单词被当作HTML标签。HTML元素的嵌套关系使用缩进表示。
{% highlight javascript %}
nav
  ul
    li: a(href="index.html") Home
    li: a(href="about.html") About
{% endhighlight %}

## 块扩展
为了简洁，Jade提供了在一行内表示嵌套元素的语法：元素标签后紧跟冒号，然后是以空白字符隔开的嵌套元素。
{% highlight javascript %}
div: p

// 冒号要紧跟外层标签，两者之间不能有空白字符
div : p

// 冒号和嵌套元素之间必须有空白字符，否则解析出错
{% endhighlight %}

## 自关闭标签
HTML中所有的自关闭标签，比如`img`、`meta`等，都能被Jade识别并且自动关闭。另外，任何一个标签可以通过在末尾添加一个`/`显式地被关闭（只有在真正需要的时候这样做）。
{% highlight javascript %}
// HTML中的自关闭标签被自动识别并关闭
img

// 可以通过在标签的末尾添加一个`/`显式地关闭一个标签
foo/
bar(foo='bar')/
{% endhighlight %}
