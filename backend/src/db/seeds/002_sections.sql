begin;

alter table pages add column if not exists order_num integer default 99;

update pages
set
  title = case slug
    when 'home' then 'Início'
    when 'mudancas-internacionais' then 'Mudanças Internacionais'
    when 'servicos' then 'Serviços'
    when 'sobre-nos' then 'Sobre Nós'
    when 'contacto' then 'Contacto'
    when 'politica-de-privacidade' then 'Política de Privacidade'
    when 'termos-de-uso' then 'Termos de Uso'
    else title
  end,
  description = case slug
    when 'home' then 'Página principal'
    when 'mudancas-internacionais' then 'Serviço de mudanças entre Portugal e o Reino Unido'
    when 'servicos' then 'Lista de serviços e preços'
    when 'sobre-nos' then 'História e valores da empresa'
    when 'contacto' then 'Formulário e moradas'
    when 'politica-de-privacidade' then 'Política de privacidade RGPD'
    when 'termos-de-uso' then 'Termos e condições de utilização'
    else description
  end,
  order_num = case slug
    when 'home' then 1
    when 'servicos' then 2
    when 'sobre-nos' then 3
    when 'mudancas-internacionais' then 4
    when 'contacto' then 5
    when 'politica-de-privacidade' then 6
    when 'termos-de-uso' then 7
    else 99
  end
where slug in (
  'home',
  'mudancas-internacionais',
  'servicos',
  'sobre-nos',
  'contacto',
  'politica-de-privacidade',
  'termos-de-uso'
);

with section_data (page_slug, slug, title, content, order_num) as (
  values
    (
      'home',
      'hero',
      'Secção Principal (Hero)',
      $json${
        "tag": "Especialistas em Mudanças Internacionais",
        "titulo": "A Sua Mudança. Com Quem Conhece o Caminho.",
        "subtitulo": "De Portugal ao Reino Unido — ou de porta a porta na sua cidade. Mais de uma década a tratar dos seus pertences como se fossem nossos.",
        "botao_orcamento": "Pedir Orçamento Gratuito",
        "botao_servicos": "Ver os Nossos Serviços"
      }$json$::jsonb,
      1
    ),
    (
      'home',
      'trust-bar',
      'Barra de Confiança',
      $json${
        "anos": "+10",
        "anos_label": "Anos de Experiência",
        "mudancas": "+500",
        "mudancas_label": "Mudanças Realizadas",
        "paises": "2",
        "paises_label": "Países Servidos",
        "avaliacao": "5★",
        "avaliacao_label": "Avaliação Média"
      }$json$::jsonb,
      2
    ),
    (
      'home',
      'services-preview',
      'Prévia de Serviços',
      $json${
        "tag": "O Que Fazemos",
        "titulo": "Soluções Completas Para Cada Mudança",
        "subtitulo": "Seja uma caixa ou uma casa inteira — temos o serviço certo para si.",
        "servico1_titulo": "Mudanças Internacionais",
        "servico1_desc": "Portugal e Reino Unido são os nossos dois lados de casa. Tratamos de tudo: embalagem, transporte, alfândega e entrega porta a porta.",
        "servico2_titulo": "Man & Van",
        "servico2_desc": "Solução rápida e acessível para pequenos volumes. Ideal para estudantes, solteiros e pequenos escritórios em qualquer ponto do Reino Unido.",
        "servico3_titulo": "Mudanças Locais UK",
        "servico3_desc": "Serviço completo nas áreas de Londres e arredores. Pontualidade, cuidado e profissionalismo em cada entrega.",
        "servico4_titulo": "Embalagem Profissional",
        "servico4_desc": "Os nossos materiais protegem cada peça como se fosse a primeira vez. Dos quadros aos frágeis — nada chega partido."
      }$json$::jsonb,
      3
    ),
    (
      'home',
      'why-us',
      'Porque Nos Escolher',
      $json${
        "tag": "Porque Nos Escolher",
        "titulo": "Mudanças São Sobre Confiança, Não Só Caixas.",
        "subtitulo": "Somos portugueses, vivemos esta realidade e sabemos o que significa mudar entre dois países.",
        "beneficio1_titulo": "Conhecemos os Dois Lados",
        "beneficio1_desc": "A nossa equipa vive entre Portugal e o Reino Unido há mais de uma década.",
        "beneficio2_titulo": "Comunicação Sem Fronteiras",
        "beneficio2_desc": "Falamos português e inglês. Estamos disponíveis por telefone, email e WhatsApp.",
        "beneficio3_titulo": "Sem Surpresas no Final",
        "beneficio3_desc": "Orçamento claro, datas cumpridas, sem custos escondidos.",
        "beneficio4_titulo": "Frota Própria e Segurada",
        "beneficio4_desc": "As nossas carrinhas são próprias, identificadas e totalmente seguradas."
      }$json$::jsonb,
      4
    ),
    (
      'home',
      'gallery',
      'Galeria de Imagens',
      $json${
        "tag": "A Nossa Frota em Ação",
        "titulo": "Cada Viagem Tem a Nossa Marca",
        "subtitulo": "Fotos reais das nossas operações — porque transparência é a melhor garantia."
      }$json$::jsonb,
      5
    ),
    (
      'home',
      'cta-banner',
      'Banner de Chamada para Ação',
      $json${
        "titulo": "Pronto Para Começar a Sua Mudança?",
        "subtitulo": "Fale connosco hoje. O orçamento é gratuito e sem compromisso.",
        "botao_orcamento": "Pedir Orçamento Agora",
        "botao_whatsapp": "Falar no WhatsApp"
      }$json$::jsonb,
      6
    ),
    (
      'mudancas-internacionais',
      'hero',
      'Secção Principal',
      $json${
        "tag": "Especialistas na Rota PT-UK",
        "titulo": "A Sua Vida Não Para nas Fronteiras.",
        "subtitulo": "Dezenas de famílias e profissionais confiam em nós todos os anos para fazer esta viagem."
      }$json$::jsonb,
      1
    ),
    (
      'mudancas-internacionais',
      'how-it-works',
      'Como Funciona',
      $json${
        "tag": "Processo Simples",
        "titulo": "Como Funciona",
        "passo1_titulo": "1. Contacto e Orçamento",
        "passo1_desc": "Fale connosco por telefone, email ou WhatsApp. Enviamos um orçamento detalhado em 24h.",
        "passo2_titulo": "2. Planeamento da Data",
        "passo2_desc": "Definimos a data de recolha e confirmamos a janela de entrega no destino.",
        "passo3_titulo": "3. Embalagem e Recolha",
        "passo3_desc": "A nossa equipa chega pontualmente, embala com cuidado e carrega a carrinha de forma segura.",
        "passo4_titulo": "4. Transporte e Entrega",
        "passo4_desc": "Mantemos contacto ao longo da viagem e entregamos pessoalmente no novo endereço."
      }$json$::jsonb,
      2
    ),
    (
      'mudancas-internacionais',
      'what-we-move',
      'O Que Transportamos',
      $json${
        "tag": "Sem Limitações",
        "titulo": "O Que Transportamos",
        "item1": "Mobília completa de casa ou apartamento",
        "item2": "Eletrodomésticos e equipamentos",
        "item3": "Obras de arte e objetos frágeis (embalagem especial)",
        "item4": "Volumes de escritório e equipamento de trabalho",
        "item5": "Caixas pessoais, roupas e pertences do dia-a-dia"
      }$json$::jsonb,
      3
    ),
    (
      'mudancas-internacionais',
      'routes',
      'As Nossas Rotas',
      $json${
        "tag": "PT e UK",
        "titulo": "As Nossas Rotas",
        "rota1": "Lisboa — Londres",
        "rota2": "Porto — Londres",
        "rota3": "Braga — Manchester",
        "rota4": "Faro — Birmingham",
        "rota5": "Qualquer ponto de Portugal para qualquer ponto do Reino Unido"
      }$json$::jsonb,
      4
    ),
    (
      'mudancas-internacionais',
      'faq',
      'Perguntas Frequentes',
      $json${
        "tag": "Esclarecimentos",
        "titulo": "Perguntas Frequentes",
        "p1_pergunta": "Quanto tempo demora a mudança de Portugal para o Reino Unido?",
        "p1_resposta": "Em média, 3 a 5 dias úteis, dependendo do volume e da rota.",
        "p2_pergunta": "Precisam de supervisão alfandegária?",
        "p2_resposta": "Para mudanças de residência entre Portugal e o Reino Unido existe documentação específica. Orientamos os nossos clientes em todo o processo.",
        "p3_pergunta": "Os bens estão seguros durante o transporte?",
        "p3_resposta": "Sim. Todos os transportes incluem seguro de carga. Os bens frágeis são embalados com materiais certificados.",
        "p4_pergunta": "Fazem também a embalagem na origem?",
        "p4_resposta": "Sim. Podemos deslocar-nos à origem e tratar de toda a embalagem."
      }$json$::jsonb,
      5
    ),
    (
      'servicos',
      'hero',
      'Secção Principal',
      $json${
        "tag": "Transparência Total",
        "titulo": "Serviços Feitos Para Si.",
        "subtitulo": "Cada mudança é diferente. Por isso temos opções para cada situação."
      }$json$::jsonb,
      1
    ),
    (
      'servicos',
      'pricing',
      'Preços Man & Van',
      $json${
        "tag": "Man & Van",
        "titulo": "Man & Van",
        "descricao": "A solução mais ágil para volumes menores. Disponível em toda a área de Londres e arredores.",
        "nota": "Mínimo 2 horas em todos os serviços.",
        "preco1_titulo": "1 Homem + Carrinha",
        "preco1_valor": "£65",
        "preco1_minimo": "Mínimo 2 horas",
        "preco2_titulo": "2 Homens + Carrinha",
        "preco2_valor": "£80",
        "preco2_minimo": "Mínimo 2 horas",
        "preco3_titulo": "3 Homens + Carrinha",
        "preco3_valor": "£95",
        "preco3_minimo": "Mínimo 2 horas",
        "preco4_titulo": "4 Homens + 2 Carrinhas",
        "preco4_valor": "£115",
        "preco4_minimo": "Mínimo 4 horas"
      }$json$::jsonb,
      2
    ),
    (
      'servicos',
      'included',
      'O Que Está Incluído',
      $json${
        "titulo": "O Que Está Incluído",
        "item1": "Carregamento e descarregamento dos seus bens",
        "item2": "Proteção de mobília com mantas e plástico bolha",
        "item3": "Desmontagem e montagem de mobília (mediante pedido)",
        "item4": "Comunicação direta com o condutor no dia da mudança",
        "item5": "Seguro de carga incluído em todos os serviços"
      }$json$::jsonb,
      3
    ),
    (
      'servicos',
      'additional-services',
      'Serviços Adicionais',
      $json${
        "titulo": "Outros Serviços",
        "servico1_titulo": "Mudanças Internacionais",
        "servico1_desc": "Para quem precisa de mover a vida entre Portugal e o Reino Unido.",
        "servico2_titulo": "Serviço de Embalagem",
        "servico2_desc": "A nossa equipa trata de toda a embalagem com materiais certificados.",
        "servico3_titulo": "Armazenamento Temporário",
        "servico3_desc": "Parcerias com empresas de self-storage em Londres."
      }$json$::jsonb,
      4
    ),
    (
      'sobre-nos',
      'hero',
      'Secção Principal',
      $json${
        "tag": "A Nossa História",
        "titulo": "Somos Portugueses. Sabemos o Que É Mudar de País.",
        "subtitulo": "Jorge Ferreira fundou esta empresa depois de ter vivido na própria pele o que é fazer uma mudança entre Portugal e o Reino Unido."
      }$json$::jsonb,
      1
    ),
    (
      'sobre-nos',
      'story',
      'A Nossa História',
      $json${
        "tag": "Desde o Início",
        "titulo": "A Nossa História",
        "paragrafo1": "Tudo começou com uma carrinha, muita vontade e uma certeza: havia uma forma melhor de ajudar as pessoas a mudar entre Portugal e o Reino Unido.",
        "paragrafo2": "Hoje, a Jorge Ferreira Movers é uma referência na rota Portugal-Reino Unido, com uma frota própria, uma equipa dedicada e centenas de mudanças realizadas com sucesso.",
        "paragrafo3": "O nosso compromisso não mudou desde o primeiro dia: tratar cada mudança com o mesmo cuidado com que trataríamos a nossa própria."
      }$json$::jsonb,
      2
    ),
    (
      'sobre-nos',
      'values',
      'Os Nossos Valores',
      $json${
        "tag": "O Que Nos Move",
        "titulo": "Os Nossos Valores",
        "valor1_titulo": "Honestidade",
        "valor1_desc": "Orçamentos claros, sem letras pequenas. O que prometemos é o que entregamos.",
        "valor2_titulo": "Pontualidade",
        "valor2_desc": "Chegamos à hora combinada. Entregamos na data confirmada. Sempre.",
        "valor3_titulo": "Cuidado",
        "valor3_desc": "Cada objeto tem uma história. Tratamos os seus bens como se fossem nossos.",
        "valor4_titulo": "Comunicação",
        "valor4_desc": "Estamos disponíveis antes, durante e depois da mudança. Nunca desaparecemos."
      }$json$::jsonb,
      3
    ),
    (
      'sobre-nos',
      'fleet',
      'A Nossa Frota',
      $json${
        "tag": "Preparada Para a Estrada",
        "titulo": "A Nossa Frota",
        "descricao": "Carrinhas próprias, identificadas, com elevadores de carga e totalmente seguradas. Preparadas para qualquer distância — de Londres a Lisboa."
      }$json$::jsonb,
      4
    ),
    (
      'contacto',
      'hero',
      'Secção Principal',
      $json${
        "tag": "Fale Connosco",
        "titulo": "Estamos Aqui Para Si.",
        "subtitulo": "Seja para pedir um orçamento, tirar uma dúvida ou simplesmente perceber como funcionamos."
      }$json$::jsonb,
      1
    ),
    (
      'contacto',
      'contact-info',
      'Informações de Contacto',
      $json${
        "titulo": "Informações de Contacto",
        "morada_uk": "4 Newman Road, Croydon, CR0 3JX, London, England",
        "morada_pt": "Estrada da Mala Posta, Casal Mil Homens, 2440-231 Golpilheira, Batalha, Portugal",
        "telefone": "+44 7796 601194",
        "email": "ferreiramovers.uk@gmail.com",
        "horario": "Segunda a Sábado: 08h00 - 20h00",
        "horario_nota": "Para urgências fora de horário, contacte-nos pelo WhatsApp."
      }$json$::jsonb,
      2
    ),
    (
      'politica-de-privacidade',
      'document',
      'Política de Privacidade',
      $json${
        "titulo": "Política de Privacidade",
        "introducao": "Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais.",
        "ultima_atualizacao": "19 de junho de 2026"
      }$json$::jsonb,
      1
    ),
    (
      'termos-de-uso',
      'document',
      'Termos de Uso',
      $json${
        "titulo": "Termos de Uso",
        "introducao": "As condições aplicáveis à utilização do site e aos nossos serviços.",
        "ultima_atualizacao": "19 de junho de 2026"
      }$json$::jsonb,
      1
    )
)
insert into sections (page_id, slug, title, content, order_num)
select pages.id, data.slug, data.title, data.content, data.order_num
from section_data data
join pages on pages.slug = data.page_slug
where not exists (
  select 1
  from sections existing
  where existing.page_id = pages.id
    and existing.slug = data.slug
);

update sections
set content = content || $json${
  "imagem_principal": "/images/client/van-loading-boxes-and-luggage.jpeg",
  "imagem_secundaria": "/images/client/movers-team-with-van-fleet.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'home')
  and slug = 'hero';

update sections
set content = content || $json${
  "imagem_frota": "/images/client/two-van-fleet-parked.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'home')
  and slug = 'why-us';

update sections
set content = content || $json${
  "imagem_fundo": "/images/client/two-moving-vans-residential-road.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'home')
  and slug = 'cta-banner';

update sections
set content = content || $json${
  "imagem_hero": "/images/client/moving-van-on-seafront-road.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'mudancas-internacionais')
  and slug = 'hero';

update sections
set content = content || $json${
  "imagem_principal": "/images/client/wrapped-pallets-ready-for-transport.jpeg",
  "imagem_secundaria": "/images/client/pallet-jack-loading-open-van.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'mudancas-internacionais')
  and slug = 'what-we-move';

update sections
set content = content || $json${
  "imagem_hero": "/images/client/labelled-moving-boxes-inside-van.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'servicos')
  and slug = 'hero';

update sections
set content = content || $json${
  "imagem_internacional": "/images/client/moving-van-on-seafront-road.jpeg",
  "imagem_embalagem": "/images/client/labelled-moving-boxes-inside-van.jpeg",
  "imagem_armazenamento": "/images/client/van-at-big-yellow-storage.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'servicos')
  and slug = 'additional-services';

update sections
set content = content || $json${
  "imagem_hero": "/images/client/movers-team-with-van-fleet.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'sobre-nos')
  and slug = 'hero';

update sections
set content = content || $json${
  "imagem_principal": "/images/client/branded-van-roadside-profile.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'sobre-nos')
  and slug = 'story';

update sections
set content = content || $json${
  "imagem_1": "/images/client/branded-van-roadside-profile.jpeg",
  "imagem_2": "/images/client/two-van-fleet-parked.jpeg",
  "imagem_3": "/images/client/two-vans-roadside-fleet.jpeg",
  "imagem_4": "/images/client/branded-van-country-property.jpeg",
  "imagem_5": "/images/client/branded-van-under-trees.jpeg",
  "imagem_6": "/images/client/van-commercial-delivery-theatre.jpeg"
}$json$::jsonb
where page_id = (select id from pages where slug = 'sobre-nos')
  and slug = 'fleet';

commit;
