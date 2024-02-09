const fs = require("fs");
const { join } = require("path");

const filePath = join(__dirname, 'users.json');

const getUsers = () => {
// Verifica se o arquivo existe:
    const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath) // Se existe, leia de forma assíncrona
        : []; // Se não, retorna um objeto vazio
    
    try {
        return JSON.parse(data); // retorna em formato de JSON a leitura dos dados da variável "data"
    } catch (error) {
        return [];
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));
// Essa função saveUser está sendo definida como uma função de flecha (arrow function) que recebe um parâmetro users. Ela utiliza a função fs.writeFileSync para escrever os dados dos usuários em um arquivo no disco. Os dados são convertidos para formato JSON usando JSON.stringify(users, null, '\t'), o que significa que os dados serão formatados com tabulação para facilitar a leitura e escrita. O arquivo em que os dados serão escritos é especificado pela variável filePath.

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers();

            res.send({ users });
        })
        .post((req, res) => {
            const users = getUsers();

            users.push(req.body);
            saveUser(users);

            res.status(201).send("OK");
        })
        .put((req, res) => {
            const users = getUsers();

            saveUser(users.map((user) => {
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }

                return user;
            }))

            return res.status(200).send("Atualizado com sucesso");
        })
        .delete((req, res) => {
            const users = getUsers();

            saveUser(users.filter(user => user.id !== req.params.id));

            res.status(200).send("Deletado com sucesso");
        })
        ;
};
// Dentro da função, é definida uma rota utilizando app.route('/users/:id?'), onde :id é um parâmetro opcional na rota. Isso significa que a rota /users/ irá corresponder a todas as requisições GET relacionadas aos usuários, e /users/:id irá corresponder a requisições GET específicas de um usuário com um determinado ID.

// Para o método GET dessa rota, é definido um callback que recebe dois parâmetros req (requisição) e res (resposta). Dentro desse callback, a função getUsers() é chamada para obter os dados dos usuários, e então esses dados são enviados como resposta para o cliente utilizando res.send({ users }). Isso significa que a lista de usuários será enviada como resposta para a requisição GET.

// Para o método POST dessa rota, é definido outro callback que também recebe req e res. Dentro desse callback, os dados dos usuários são obtidos novamente usando getUsers(). O corpo da requisição (req.body) é então adicionado ao array de usuários, e os usuários atualizados são salvos usando saveUser(users). Finalmente, é enviada uma resposta com status 201 (Created) e a mensagem "OK" utilizando res.status(201).send("OK"). Isso indica que a criação do usuário foi bem-sucedida.

module.exports = userRoute;