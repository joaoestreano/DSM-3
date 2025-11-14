class Usuario {
    constructor(
        public username: string,
        public senha: string
    ) {}
}

class AutenticacaoDeUsuario {
    private usuarios: Usuario[] = [];

    registrarUsuario(username: string, senha: string): void {
        this.usuarios.push(new Usuario(username, senha));
    }

    autenticarUsuario(username: string, senha: string): boolean {
        return this.usuarios.some(
            u => u.username === username && u.senha === senha
        );
    }
}

const autenticacao = new AutenticacaoDeUsuario();
autenticacao.registrarUsuario("alice", "senha123");
autenticacao.registrarUsuario("bob", "outrasenha");

const usuarioAutenticado = autenticacao.autenticarUsuario("alice", "senha123");

if (usuarioAutenticado) {
    console.log("Usuário autenticado com sucesso!");
} else {
    console.log("Falha na autenticação do usuário!");
}
