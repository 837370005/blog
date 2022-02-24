<template><h2 id="快速搭建博客" tabindex="-1"><a class="header-anchor" href="#快速搭建博客" aria-hidden="true">#</a> 快速搭建博客</h2>
<p>1.使用你喜欢的包管理器进行初始化</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init <span class="token comment"># yarn init</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>2.安装vuepress<br>
我们已经不再推荐全局安装 VuePress</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> -D vuepress@next <span class="token comment"># npm install -D vuepress@next</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>要安装@next，不然出来的样式不对</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>如果你的现有项目依赖了 webpack 3.x，我们推荐使用 Yarn (opens new window)而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。</p>
</div>
</template>
