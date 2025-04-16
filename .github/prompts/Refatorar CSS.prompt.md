#  BIOS-CSS (**B**EM, **I**TCSS, **O**OCSS, **S**MACSS)

Revise a estilização da página index.html e home-page.css para que siga o padrão de nomenclatura de classes e separação de camadas da mesma forma é feita em componentes.html e cards.css e keys.css

Para entender melhor esses princípios, abaixo estão as diretrizes.

Seu objetivo usando como referência essas diretrizes e usando como exemplo de aplicação o que foi feito em componentes.html e cards.css e keys.css revisar e alterar apenas o <main class="main-content"> e todo o seu conteúdo, mas SEM ALTERAR O RESULTADO VISUAL! IMPORTANTE! 

O <main class="main-content"> deve permanecer visualmente idêntico!

##  BIOS-CSS (**B**EM, **I**TCSS, **O**OCSS, **S**MACSS)

### 1. **Structure (Estrutura)**

**Descrição:** Propriedades que definem a disposição, o layout e a organização geral dos elementos na página.

### **Layout**

- `display: block | flex | grid | inline | inline-block | none;`
- `position: static | relative | absolute | fixed | sticky;`
- `float: left | right | none;`
- `clear: none | left | right | both;`

### **Dimensionamento (Sizing)**

- `width: <valor>;`
- `height: <valor>;`
- `max-width: <valor>;`
- `max-height: <valor>;`
- `min-width: <valor>;`
- `min-height: <valor>;`

### **Box Model**

- `box-sizing: border-box | content-box;`
- `margin: <valor>;`
- `padding: <valor>;`

### **Posicionamento**

- `top: <valor>;`
- `right: <valor>;`
- `bottom: <valor>;`
- `left: <valor>;`

### **Empilhamento (Stacking)**

- `z-index: <valor>;`

### **Overflow**

- `overflow: visible | hidden | scroll | auto;`
- `overflow-x: <valor>;`
- `overflow-y: <valor>;`

### **Flexbox/Grid Específicos**

- `flex: <valor>;`
- `flex-direction: row | column;`
- `justify-content: flex-start | center | flex-end | space-between | space-around;`
- `align-items: flex-start | center | flex-end | stretch;`
- `grid-template-columns: <valor>;`
- `grid-template-rows: <valor>;`
- `gap: <valor>;`

---

### 2. **Skin (Estilo Visual)**

**Descrição:** Propriedades que controlam a aparência visual dos elementos, como cores, bordas, fundos e efeitos.

### **Cores**

- `color: <valor>;`
- `background-color: <valor>;`

### **Bordas**

- `border-color: <valor>;`
- `border-style: none | solid | dashed | dotted | double | groove | ridge | inset | outset;`
- `border-width: <valor>;`
- `border-radius: <valor>;`

### **Fundos**

- `background-image: url(<valor>);`
- `background-position: <valor>;`
- `background-size: cover | contain | <valor>;`
- `background-repeat: no-repeat | repeat | repeat-x | repeat-y;`
- `background-attachment: scroll | fixed | local;`

### **Efeitos Visuais**

- `box-shadow: <valor>;`
- `opacity: <valor>;`
- `filter: <valor>;`

### **Transições e Animações**

- `transition: <propriedade> <duração> <função-timing>;`
- `animation: <nome> <duração> <função-timing> <iteracao>;`

---

### 3. **Container (Contêiner)**

**Descrição:** Propriedades focadas em definir áreas que contêm outros elementos, facilitando a organização e a disposição interna.

### **Layout do Contêiner**

- `display: flex | grid;`
- `flex-direction: row | column;`
- `justify-content: flex-start | center | flex-end | space-between | space-around;`
- `align-items: flex-start | center | flex-end | stretch;`
- `grid-template-columns: <valor>;`
- `grid-template-rows: <valor>;`
- `gap: <valor>;`

### **Dimensionamento do Contêiner**

- `width: <valor>;`
- `max-width: <valor>;`
- `height: <valor>;`
- `max-height: <valor>;`
- `margin: <valor>;`
- `padding: <valor>;`

### **Outras Propriedades Relevantes**

- `overflow: visible | hidden | scroll | auto;`
- `position: relative | absolute | fixed | sticky;`

---

### 4. **Content (Conteúdo)**

**Descrição:** Propriedades que tratam da formatação e apresentação do conteúdo textual e de listas dentro dos elementos.

### **Tipografia**

- `font-family: <valor>;`
- `font-size: <valor>;`
- `font-weight: normal | bold | <valor>;`
- `font-style: normal | italic | oblique;`
- `line-height: <valor>;`
- `text-align: left | center | right | justify;`
- `text-transform: none | uppercase | lowercase | capitalize;`
- `text-decoration: none | underline | line-through | overline;`
- `letter-spacing: <valor>;`
- `word-spacing: <valor>;`
- `white-space: normal | nowrap | pre | pre-wrap | pre-line;`
- `text-overflow: clip | ellipsis | <valor>;`

### **Listas**

- `list-style: none | disc | circle | square;`
- `list-style-type: <valor>;`
- `list-style-image: url(<valor>);`
- `list-style-position: inside | outside;`

### **Outras Propriedades de Conteúdo**

- `vertical-align: baseline | sub | super | text-top | text-bottom | middle | top | bottom | <valor>;`
- `content: <valor>;` *(usada principalmente com pseudo-elementos)*

# Resumo → BIOS-CSS (**B**EM, **I**TCSS, **O**OCSS, **S**MACSS)

[Separação]

- **Os rulesets devem ser separadas pela finalidade e tipo de regras que contém: Structure ou Skin. Content ou Container.** Devido a uma certa sobreposição, pode haver rulesets que sirvam como Structure e Container. A separação está incluida em <SeparacaoDeRegas>.

[Settings]

- Contém variáveis para fonts, colors, breakpoints, spacings, z-indexes (dropdown, modal, tooltip), transitions, etc;
- Nenhuma regra CSS deve ser escrita aqui.

[Base]

- Backgrounds e regras default;
- Utiliza seletores de elemento, descendência e pseudo-classes;
- **Incluem quase exclusivamente seletores de elemento.** Não utiliza seletores de classe ou ID.

[Layout]

- Dividem a página em seções. Layouts unem um ou mais módulos juntos;
- Usa-se o prefixo “l-” e são quase exclusivamente seletores de ID;
- Layouts principais e únicos usam seletores ID, mas Layouts que precisam ser reutilizados usam classes;
- Há uma distinção entre layout de componentes principais (exemplo: header, footer) e componentes menores (exemplo: callout, login, item da navegação). Os menores, são incluídos entre os Módulos. Os maiores, são incluídos nos estilos de Layout.

[Module]

- Módulos são partes reutilizáveis e modulares;
- Estão dentro de componentes Layout ou outros componentes Module;
- Não se usa prefixos para indicar que a classe se trata de um Module, apenas o nome do módulo em si;
- Evitar usar seletores de ID e elementos, buscando apenas classes;
- Módulos interrelacionados compartilham o nome base como um prefixo. E.g.: “.card” e “.card-container”;
- Submódulos (também chamados elementos) são partes internas de um módulo (também chamados bloco) que não têm significado ou utilidade fora do contexto desse módulo. Dependem diretamente do módulo principal. Utilizam a nomenclatura que reflete a hierarquia, combinando o nome do módulo e o submódulo separados por "__". E.g.: ".card__titulo" e ".card__texto".

[State (também chamado modificador)]

- Descreve como módulos ou layouts irão aparentar em determinado estado;
- Usa-se o conector "--" e o prefixo “is-”. E.g.: ".card--is-hidden". Quando se trata de uma pseudo-classe, apenas usá-la. E.g.: ".botao:hover";
- Outra opção é extender a classe: ".card.is-hidden", principalmente quando o state é utilizado por diferentes modules.
- O uso de !important é permitido nessa camada.

[Diferenças Submodule e States]

- Os estilos submodule são aplicados em render-time e raramente mudam depois. Estilos submodule alteram módulos;
- Os estilos state indicam relação com JavaScript. Estilos states alteram módulo ou layout, sendo usados principalmente por meio de código JavaScript.

[Theme]

- Similar ao state, mas foca em cores, imagens e alterações cosméticas em geral;
- Sobrescreve estilos Base - como cores padrão de links - ou estilos de Modules - como cores e bordas. Esses ajustes podem afetar Layouts com diferentes arranjos ou alterar a aparência de States;
- Usar o prefixo “t-” e separar nome do módulo por "__". E.g: ".t-botao__primario".

[Profundidade de aplicabilidade]

- A profundidade de aplicabilidade é o número de gerações que são afetadas por uma regra. O navegador processa regras da direita para esquerda em todos os nós, como um AND de condições que para no primeiro nó falso ou continua até que a expressão seja verdadeira para o nó em questão. Alta profundidade é negativa por implicar muita dependência de uma estrutura HTML em particular. As duas regras abaixo tem profundidade igual a seis:`body.article > #main > #content > #intro > p > b.article #intro b`.




SEM ALTERAR O RESULTADO  VISUAL! IMPORTANTE! O <main class="main-content"> deve permanecer visualmente idêntico!
SEM ALTERAR O RESULTADO VISUAL! IMPORTANTE! O <main class="main-content"> deve permanecer visualmente idêntico!
SEM ALTERAR O RESULTADO VISUAL! IMPORTANTE! O <main class="main-content"> deve permanecer visualmente idêntico!
