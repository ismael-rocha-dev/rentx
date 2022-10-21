# Cadastro de Carro

**RF**
Deve ser possível cadastrar um novo carro

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado como disponível por padrão.
Somente administradores podem cadastrar carros.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis

**RN**
O usuário não precisa estar logado no sistema

# Cadastro de especificação do carro

**RF**
Deve ser possível cadastrar uma especificação de um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.
Somente administradores podem cadastrar especificações.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastar uma mesma especificação mais de uma vez.

# Cadastro de imagens do carro

**RF**
Deve ser possível poder cadastrar imagem do carro

**RNF**
Utilizar multer para upload de arquivos

**RN**
O usuário poderá cadastrar mais de uma imagem para o mesmo carro

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24h
