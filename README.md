# GitHub User Finder
## Sobre
Aplicação web desenvolvida para o Desafio Front-end - Time Live da GreenMile
Trata-se de uma ferramenta de busca de usuários do GitHub, através do nome de perfil - username - dos mesmos. 
O retorno da busca mostra as informações:
* Username + localização em texto;
* Biografia;
* Link do perfil no GitHub;
* Repositórios que o usuário marcou com estrela.
A proposta de aplicação é manter uma interface limpa e intuitiva. Por este motivo, optei por trabalhar com uma sidebar que serve como a forma de interação do usuário, fornecendo o input de busca, e também, como o retorno da requisição, onde os dados dos usuários buscados são exibidos.
Ao lado da sidebar, a aplicação exibe um mapa (inicializado sem renderização, como blankstate), que marca dinamicamente a localização do usuário buscado.

## Prints da aplicação
![screenshot](/prints/blankstate.jpg)
Aplicação inicializada, blankstate.

![screenshot](/prints/loadinguser.jpg)<br/>
Ícone de loading ao ser inicialziada a chamada à API do GitHub, quando o usuário confirma a busca.

![screenshot](/prints/nonexistinguser.jpg)
Alerta exibido ao usuário caso o username inserido não exista.

![screenshot](/prints/usefound.jpg)
Exibição dos dados do usuário encontrado na API do GitHub, incluindo a marcação no mapa.

## Lógica e construção
### Arquitetura
A aplicação foi construída utilizando a API do GitHub, para coletar os dados dos usuários buscados, através de seus usernames, e as APIs Maps e Geocoding do Google Maps, para exibição do mapa, inserção de marcadores e geocoding da localização fornecida pela API do GitHub em coordenadas.
Utilizei a biblioteca React para este projeto, além de algumas dependências, como Axios para as requisições HTTP e FontAwesome para inserção de ícones.

### Lógica
A aplicação se baseia no uso de states para alteração das informações exibidas em tela. Para isto, dei preferência ao uso de Hooks e evitei o uso de componentes em classes, reduzindo a verbosidade e necessidade de boilerplate.
Busquei a gestão de componentes em suas formas stateful vs stateless, mantendo apenas o componente App.js, pai da árvore de componentes, com estados, compartilhando estes estados com seus componentes filhos através das props.
A aplicação tem três componentes reutilizáveis: SideBar, Header e GMap; e um componente central: App.js
Em um único método, executado com o uso do Hook useCallback, a aplicação faz duas requisições à API do GitHub, uma para retornar os dados do usuário buscado, outra para retornar os repositórios que o usuário marcou com estrela/favoritou. Além disso, o método é responsável por retornar a requisição à API Geocode, passando como parâmetro da requisição a localização do usuário, atribuída a uma variável que captura o atributo location do retorno da busca da API do GitHub. 
Dei preferência a trabalhar desta forma, visto que o usuário da aplicação toma apenas uma ação principal: o clique no botão "Buscar". Sendo este clique responsável por disparar o método handleSubmit.
Com o uso do Geocode, é possível atribuir os valores de latitude e longitude da localização do usuário através de destructuring, e repassá-los ao componente GMap como props, redefinindo o parâmetro center a cada nova busca e atualizando o mapa da aplicação de acordo.
Por fim, a sidebar retorna os resultados das requisições à API do GitHub, informando os dados do usuário buscado, através de atribuições simples.
Os repositórios marcados são retornados em um array. Portanto, utilizei o método map para listar dinamicamente e iterativamente o retorno da requisição, atribuindo como key o atributo id de cada repositório.
Todos os três componentes são utilizados no componente pai App.js, com a devida passagem de props, seja em funções ou states.

## Dificuldades do desafio
O desafio me deu oportunidades de trabalhar com ferramentas que desconhecia, além de praticar com features que já utilizei.
Acredito que a maior dificuldade que encontrei foi na gestão do componente GMap e a utilização da dependência de forma correta, bem como a utilização correta da API Geocoding, em conjunto com o retorno da API do GitHub. De início, gastei algum tempo até entender que o usuário ainda não estava definido dentro do método chamado pelo botão "Buscar" e que, por este motivo, o retorno da requisição à API Geocoding não estava correto. Quando entendi este entrave, decidi atribuir o atributo de localização do usuário a uma variável, desta forma instanciando o dado e conseguindo utilizá-lo efetivamente na chamada ao Geocode.
Outro problema que enfrentei foi na estilização do componente GMap. Devido ao layout escolhido, tive dificuldades no posicionamento do mapa. Optei por estilizar o container diretamente no JSX, mas gostaria de tê-lo feito em um arquivo separado.
Por fim, enfrentei também algumas dificuldades na estilização e layout da página (especialmente ao tentar inserir um ícone dentro de um input), mas acredito que entrego um projeto intuitivo, esteticamente agradável e com uma boa experiência de usuário.
