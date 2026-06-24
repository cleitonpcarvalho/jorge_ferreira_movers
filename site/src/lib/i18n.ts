'use client'

import {
  createContext,
  createElement,
  ReactNode,
  useContext,
  useState,
} from 'react'

export type Lang = 'pt' | 'en'

export const translations = {
  pt: {
    nav: {
      home: 'Início',
      international: 'Mudanças Internacionais',
      personalOrganizer: 'Personal Organizer',
      limpeza: 'Limpeza Pós Mudança',
      services: 'Serviços',
      about: 'Sobre Nós',
      contact: 'Contacto',
      quote: 'Pedir Orçamento',
    },
    footer: {
      rights: 'Todos os direitos reservados',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Uso',
      madeWith: 'Feito com ❤️ por',
      addressUK: '4 Newman Road, Croydon, CR0 3JX, Londres, Inglaterra',
      addressPT:
        'Estrada da Mala Posta, Casal Mil Homens, 2440-231 Golpilheira, Batalha, Portugal',
      phone: 'Telefone',
      email: 'Email',
      followUs: 'Siga-nos',
      quickLinks: 'Links Rápidos',
      contactUs: 'Contacte-nos',
    },
    whatsapp: {
      message: 'Olá! Gostaria de pedir um orçamento para uma mudança.',
    },
    cta: {
      quote: 'Pedir Orçamento',
      contact: 'Contactar Agora',
      whatsapp: 'Falar no WhatsApp',
      learn: 'Saber Mais',
    },
    home: {
      heroTag: 'Especialistas em Mudanças Internacionais',
      heroTitle: 'A Sua Mudança.\nCom Quem Conhece\no Caminho.',
      heroSubtitle:
        'De Portugal ao Reino Unido — ou de porta a porta na sua cidade. Mais de uma década a tratar dos seus pertences como se fossem nossos.',
      heroCta1: 'Pedir Orçamento Gratuito',
      heroCta2: 'Ver os Nossos Serviços',
      heroRoute: 'Serviço PT-UK',
      heroInsurance: 'Seguro Incluído',
      heroRating: '5 Estrelas',
      heroImageAlt: 'Carrinha Jorge Ferreira Movers a carregar uma mudança',
      teamImageAlt: 'Equipa Jorge Ferreira Movers junto à frota',
      heroBadgeNumber: '+500 Mudanças',
      heroBadgeText: 'Realizadas com Sucesso',

      trustYears: '+10 Anos de Experiência',
      trustMoves: '+500 Mudanças Realizadas',
      trustCountries: '2 Países, 1 Equipa',
      trustRating: 'Avaliação 5 Estrelas',
      trustYearsLabel: 'Anos de Experiência',
      trustMovesLabel: 'Mudanças Realizadas',
      trustCountriesLabel: 'Países Servidos',
      trustRatingLabel: 'Avaliação Média',

      servicesTag: 'O Que Fazemos',
      servicesTitle: 'Soluções Completas\nPara Cada Mudança',
      servicesSubtitle:
        'Seja uma caixa ou uma casa inteira — temos o serviço certo para si.',
      service1Title: 'Mudanças Internacionais',
      service1Desc:
        'Portugal e Reino Unido são os nossos dois lados de casa. Tratamos de tudo: embalagem, transporte, alfândega e entrega porta a porta.',
      service2Title: 'Man & Van',
      service2Desc:
        'Solução rápida e acessível para pequenos volumes. Ideal para estudantes, solteiros e pequenos escritórios em qualquer ponto do Reino Unido.',
      service3Title: 'Mudanças Locais UK',
      service3Desc:
        'Serviço completo nas áreas de Londres e arredores. Pontualidade, cuidado e profissionalismo em cada entrega.',
      service4Title: 'Embalagem Profissional',
      service4Desc:
        'Os nossos materiais protegem cada peça como se fosse a primeira vez. Dos quadros aos frágeis — nada chega partido.',
      servicesLink: 'Ver Todos os Serviços',
      servicesCta: 'Ver Todos os Serviços e Preços',
      learnMore: 'Saber Mais',

      whyTag: 'Porque Nos Escolher',
      whyTitle: 'Mudanças São Sobre\nConfiança, Não Só Caixas.',
      whySubtitle:
        'Somos portugueses, vivemos esta realidade e sabemos o que significa mudar entre dois países.',
      why1Title: 'Conhecemos os Dois Lados',
      why1Desc:
        'A nossa equipa vive entre Portugal e o Reino Unido há mais de uma década. Não é só trabalho — é a nossa própria história.',
      why2Title: 'Comunicação Sem Fronteiras',
      why2Desc:
        'Falamos português e inglês. Estamos disponíveis por telefone, email e WhatsApp em ambos os países.',
      why3Title: 'Sem Surpresas no Final',
      why3Desc:
        'Orçamento claro, datas cumpridas, sem custos escondidos. A transparência é a base de cada relação com os nossos clientes.',
      why4Title: 'Frota Própria e Segurada',
      why4Desc:
        'As nossas carrinhas são próprias, identificadas e totalmente seguras. Os seus bens viajam protegidos do início ao fim.',
      whyCta: 'Falar Connosco',
      whyStatement:
        'Orçamento gratuito. Sem compromisso. Resposta em 24h.',
      fleetImageAlt: 'Duas carrinhas da frota Jorge Ferreira Movers',

      galleryTag: 'A Nossa Frota em Ação',
      galleryTitle: 'Cada Viagem\nTem a Nossa Marca',
      gallerySubtitle:
        'Fotos reais das nossas operações — porque transparência é a melhor garantia.',
      galleryImageAlt: 'Operação real da Jorge Ferreira Movers',
      galleryCta: 'Pedir Orçamento Gratuito',

      ctaBannerTitle: 'Pronto Para Começar a Sua Mudança?',
      ctaBannerSubtitle:
        'Fale connosco hoje. O orçamento é gratuito e sem compromisso.',
      ctaBannerCta1: 'Pedir Orçamento Agora',
      ctaBannerCta2: 'Falar no WhatsApp',
      ctaBannerImageAlt: 'Carrinhas Jorge Ferreira Movers numa mudança',
    },
    services: {
      pageTitle: 'Serviços e Preços',
      pageSubtitle:
        'Soluções honestas para cada necessidade. Preços claros, sem surpresas.',
      heroTag: 'Transparência Total',
      heroTitle: 'Serviços Feitos\nPara Si.',
      heroSub:
        'Cada mudança é diferente. Por isso temos opções para cada situação — seja uma caixa ou uma casa inteira.',
      manvanTag: 'Preços Claros',
      manvanTitle: 'Man & Van',
      manvanDesc:
        'A solução mais ágil para volumes menores. Ideal para estudantes, jovens profissionais e pequenos escritórios. Serviço disponível em toda a área de Londres e arredores.',
      manvanNote: 'Mínimo 2 horas em todos os serviços.',
      price1Title: '1 Homem + Carrinha',
      price1Value: '£65',
      price1Unit: '/ hora',
      price1Min: 'Mínimo 2 horas',
      price2Title: '2 Homens + Carrinha',
      price2Value: '£80',
      price2Unit: '/ hora',
      price2Min: 'Mínimo 2 horas',
      price3Title: '3 Homens + Carrinha',
      price3Value: '£95',
      price3Unit: '/ hora',
      price3Min: 'Mínimo 2 horas',
      price4Title: '4 Homens + 2 Carrinhas',
      price4Value: '£115',
      price4Unit: '/ hora',
      price4Min: 'Mínimo 4 horas',
      priceCta: 'Pedir Este Serviço',
      inclTitle: 'O Que Está Incluído',
      incl1: 'Carregamento e descarregamento dos seus bens',
      incl2: 'Proteção de mobília com mantas e plástico bolha',
      incl3: 'Desmontagem e montagem de mobília (mediante pedido)',
      incl4: 'Comunicação direta com o condutor no dia da mudança',
      incl5: 'Seguro de carga incluído em todos os serviços',
      additionalTag: 'Mais Soluções',
      intlTitle: 'Mudanças Internacionais',
      intlDesc:
        'Para quem precisa de mover a vida entre Portugal e o Reino Unido. Tratamos de todo o processo — da primeira caixa até à entrega na nova morada.',
      intlCta: 'Saber Mais Sobre Mudanças Internacionais',
      packTitle: 'Serviço de Embalagem',
      packDesc:
        'Não quer preocupar-se com a embalagem? A nossa equipa trata de tudo. Usamos materiais certificados para proteger cada peça, dos frágeis à mobília volumosa.',
      packCta: 'Pedir Serviço de Embalagem',
      storageTitle: 'Armazenamento Temporário',
      storageDesc:
        'Precisa de guardar os seus bens durante a mudança? Temos parcerias com empresas de self-storage em Londres para garantir que os seus bens ficam seguros.',
      storageCta: 'Falar Sobre Armazenamento',
      ctaTitle: 'Não Tem a Certeza de Qual é o Serviço Certo?',
      ctaSub:
        'Fale connosco. Explicamos tudo e apresentamos o orçamento mais adequado para a sua situação.',
      ctaBtn: 'Pedir Orçamento Gratuito',
      heroImageAlt: 'Caixas profissionais preparadas para uma mudança',
    },
    international: {
      pageTitle: 'Mudanças Internacionais',
      pageSubtitle:
        'Portugal ao Reino Unido. Reino Unido a Portugal. Nós conhecemos o caminho.',
      heroTag: 'Especialistas na Rota PT-UK',
      heroTitle: 'A Sua Vida Não\nPara nas Fronteiras.',
      heroSub:
        'Dezenas de famílias e profissionais confiam em nós todos os anos para fazer esta viagem. Deixe a logística connosco.',
      howTitle: 'Como Funciona',
      howTag: 'Processo Simples',
      howSubtitle:
        'Quatro etapas claras, uma equipa sempre presente e contacto do início ao fim.',
      step1Title: '1. Contacto e Orçamento',
      step1Desc:
        'Fale connosco por telefone, email ou WhatsApp. Descreva o volume da mudança e enviaremos um orçamento detalhado em 24h.',
      step2Title: '2. Planeamento da Data',
      step2Desc:
        'Definimos a data de recolha em Portugal ou no Reino Unido e confirmamos a janela de entrega no destino.',
      step3Title: '3. Embalagem e Recolha',
      step3Desc:
        'A nossa equipa chega pontualmente, embala com cuidado cada peça e carrega a carrinha de forma organizada e segura.',
      step4Title: '4. Transporte e Entrega',
      step4Desc:
        'Viajamos pela rota mais eficiente. Mantemos contacto ao longo da viagem e entregamos pessoalmente no novo endereço.',
      whatTitle: 'O Que Transportamos',
      whatTag: 'Sem Limitações',
      whatSubtitle:
        'De pertences pessoais a casas completas, planeamos a proteção certa para cada volume.',
      what1: 'Mobília completa de casa ou apartamento',
      what2: 'Eletrodomésticos e equipamentos',
      what3: 'Obras de arte e objetos frágeis (embalagem especial)',
      what4: 'Volumes de escritório e equipamento de trabalho',
      what5: 'Caixas pessoais, roupas e pertences do dia-a-dia',
      routesTitle: 'As Nossas Rotas',
      routesTag: 'PT e UK',
      routesSubtitle:
        'Recolhas e entregas flexíveis, com cobertura porta a porta nos dois países.',
      route1: 'Lisboa — Londres',
      route2: 'Porto — Londres',
      route3: 'Braga — Manchester',
      route4: 'Faro — Birmingham',
      route5:
        'Qualquer ponto de Portugal para qualquer ponto do Reino Unido',
      faqTitle: 'Perguntas Frequentes',
      faqTag: 'Esclarecimentos',
      faqSubtitle:
        'Respostas diretas para preparar a sua mudança internacional com confiança.',
      faq1q:
        'Quanto tempo demora a mudança de Portugal para o Reino Unido?',
      faq1a:
        'Em média, 3 a 5 dias úteis, dependendo do volume e da rota. Confirmamos sempre a janela de entrega antes de partir.',
      faq2q: 'Precisam de supervisão alfandegária?',
      faq2a:
        'Para mudanças de residência entre Portugal e o Reino Unido pós-Brexit existe documentação específica. Orientamos os nossos clientes em todo o processo.',
      faq3q: 'Os bens estão seguros durante o transporte?',
      faq3a:
        'Sim. Todos os transportes incluem seguro de carga. Os bens frágeis são embalados com materiais certificados pela nossa equipa.',
      faq4q: 'Fazem também a embalagem na origem?',
      faq4a:
        'Sim. Podemos deslocar-nos à origem e tratar de toda a embalagem. Basta indicar na altura do orçamento.',
      ctaTitle: 'Pronto Para Fazer Esta Viagem?',
      ctaSub:
        'Milhares de quilómetros — mas com a nossa equipa, é como se estivesse ao lado.',
      ctaBtn: 'Pedir Orçamento Internacional',
      heroImageAlt:
        'Carrinha Jorge Ferreira Movers numa rota internacional junto ao mar',
      transportImageAlt: 'Paletes embaladas para transporte internacional',
    },
    personalOrganizer: {
      heroTag: 'Serviço Premium',
      heroTitle: 'Da Caixa ao Lugar Certo.',
      heroSubtitle:
        'Não basta mudar — é preciso organizar. A nossa equipa de Personal Organizer transforma a sua nova casa num espaço funcional, arrumado e pronto a viver desde o primeiro dia.',
      whatTag: 'O Que É',
      whatTitle: 'Organização Profissional Ao Seu Lado',
      whatSubtitle:
        'O Personal Organizer vai além da mudança. É um serviço dedicado a quem quer começar a nova fase da vida com tudo no lugar certo.',
      whatP1:
        'Depois de uma mudança, a sensação de caos pode ser avassaladora. Caixas por todo o lado, objectos fora do sítio, não saber por onde começar. O nosso serviço de Personal Organizer existe precisamente para eliminar esse stress.',
      whatP2:
        'A nossa equipa especializada trabalha em conjunto consigo para categorizar, organizar e arrumar cada divisão da sua nova casa. Desde a cozinha até ao quarto das crianças — tudo fica no lugar certo, etiquetado e funcional.',
      whatP3:
        'É o serviço ideal para famílias, profissionais ocupados e qualquer pessoa que valorize o seu tempo e bem-estar.',
      whatCta: 'Pedir Orçamento de Personal Organizer',
      inclTag: 'O Que Inclui',
      inclTitle: 'Um Serviço Completo de Organização',
      card1Title: 'Triagem e Categorização',
      card1Desc:
        'Separamos e categorizamos todos os seus pertences por divisão, tipo e frequência de uso.',
      card2Title: 'Etiquetagem Profissional',
      card2Desc:
        'Todas as caixas e pertences são etiquetados com clareza para facilitar a localização imediata.',
      card3Title: 'Organização por Divisão',
      card3Desc:
        'Cozinha, sala, quartos, casa de banho — cada espaço é organizado de forma lógica e funcional.',
      card4Title: 'Arrumação Final',
      card4Desc:
        'Não saímos antes de tudo estar no lugar. A sua casa fica pronta a habitar desde o primeiro momento.',
      card5Title: 'Serviço Flexível',
      card5Desc:
        'Disponível antes, durante ou após a mudança. Adaptamos o serviço ao seu ritmo e necessidades.',
      card6Title: 'Apoio Personalizado',
      card6Desc:
        'Trabalhamos ao seu ritmo, respeitando as suas preferências e o valor sentimental de cada objecto.',
      galleryTag: 'O Nosso Trabalho',
      galleryTitle: 'Resultados Que Falam Por Si',
      gallerySubtitle: 'Cada espaço organizado é uma família mais tranquila.',
      ctaTitle: 'Pronto Para Uma Casa Organizada Desde o Primeiro Dia?',
      ctaSubtitle:
        'Fale connosco e descubra como o Personal Organizer pode transformar a sua mudança numa experiência tranquila e organizada.',
      ctaBtn1: 'Pedir Orçamento',
      ctaBtn2: 'Falar no WhatsApp',
      galleryImage1Alt: 'Personal Organizer a arrumar roupa num roupeiro',
      galleryImage2Alt: 'Organização profissional de um roupeiro infantil',
      galleryImage3Alt: 'Camisas organizadas por cor em cabides uniformes',
      galleryImage4Alt: 'Coleção de sapatos organizada em prateleiras',
      whatsappMessage:
        'Olá! Gostaria de saber mais sobre o serviço de Personal Organizer.',
    },
    limpeza: {
      heroTag: 'Limpeza Profissional',
      heroTitle: 'A Sua Nova Casa, Impecável Desde o Primeiro Dia.',
      heroSubtitle:
        'Antes de entrar ou depois de sair — a nossa equipa de limpeza pós mudança deixa cada divisão brilhante, higienizada e pronta a receber a sua vida.',
      preTitle: 'Limpeza Pré-Entrada',
      preSubtitle: 'Para receber a sua nova casa nas melhores condições',
      preItem1: 'Limpeza profunda de todas as divisões',
      preItem2: 'Higienização de casas de banho e cozinha',
      preItem3: 'Limpeza de janelas, vidros e caixilhos',
      preItem4: 'Aspiração e lavagem de pavimentos',
      preItem5: 'Remoção de resíduos da obra ou mudança anterior',
      preCta: 'Pedir Orçamento →',
      postTitle: 'Limpeza Pós-Saída',
      postSubtitle: 'Deixe o espaço anterior em perfeitas condições',
      postItem1: 'Limpeza geral para devolução do imóvel',
      postItem2: 'Remoção de resíduos e objectos deixados',
      postItem3: 'Limpeza de marcas nas paredes e rodapés',
      postItem4: 'Higienização completa de casas de banho',
      postItem5: 'Preparação do imóvel para nova visita ou arrendamento',
      postCta: 'Pedir Orçamento →',
      whyTag: 'Porque Escolher-nos',
      whyTitle: 'Limpeza Profissional é Diferente',
      why1Title: 'Rapidez e Eficiência',
      why1Desc:
        'Equipa treinada que executa o trabalho no menor tempo possível, sem comprometer a qualidade.',
      why2Title: 'Produtos Certificados',
      why2Desc:
        'Utilizamos produtos de limpeza profissionais, seguros para crianças, animais e o meio ambiente.',
      why3Title: 'Resultado Garantido',
      why3Desc:
        'Se não ficou perfeito, voltamos. A sua satisfação é a nossa prioridade.',
      why4Title: 'Agendamento Flexível',
      why4Desc:
        'Disponível em qualquer dia, incluindo fins de semana e feriados. Adaptamo-nos ao seu calendário.',
      whyCta: 'Agendar Limpeza',
      galleryTag: 'Resultados Reais',
      galleryTitle: 'Espaços Transformados',
      ctaTitle: 'A Sua Casa Merece um Começo Impecável.',
      ctaSubtitle:
        'Contacte-nos hoje e receba um orçamento gratuito para limpeza pós mudança.',
      ctaBtn1: 'Pedir Orçamento Gratuito',
      ctaBtn2: 'Falar no WhatsApp',
      image1Alt: 'Apartamento vazio, luminoso e impecavelmente limpo',
      image2Alt: 'Profissional a limpar uma sala luminosa',
      image3Alt: 'Cozinha de apartamento limpa e pronta a usar',
      image4Alt: 'Sala vazia com pavimento limpo e luz natural',
      image5Alt: 'Apartamento vazio com casa de banho higienizada',
      ctaImageAlt: 'Sala vazia, limpa e pronta para uma nova mudança',
      whatsappMessage:
        'Olá! Gostaria de saber mais sobre o serviço de Limpeza Pós Mudança.',
    },
    about: {
      pageTitle: 'Sobre Nós',
      pageSubtitle:
        'Uma empresa fundada com um propósito: tornar as mudanças internacionais mais humanas.',
      heroTag: 'A Nossa História',
      heroTitle: 'Somos Portugueses.\nSabemos o Que É\nMudar de País.',
      heroSub:
        'Jorge Ferreira fundou esta empresa depois de ter vivido na própria pele o que é fazer uma mudança entre Portugal e o Reino Unido. Desde então, ajudamos centenas de famílias a fazer o mesmo — com cuidado, honestidade e profissionalismo.',
      storyTitle: 'A Nossa História',
      storyTag: 'Desde o Início',
      storyP1:
        'Tudo começou com uma carrinha, muita vontade e uma certeza: havia uma forma melhor de ajudar as pessoas a mudar entre Portugal e o Reino Unido. Jorge Ferreira, fundador da empresa, tinha vivido na própria pele as dificuldades de uma mudança internacional — a falta de comunicação, os prazos não cumpridos, o cuidado insuficiente com os bens.',
      storyP2:
        'Decidiu criar um serviço diferente. Um serviço feito por portugueses, para portugueses — mas igualmente preparado para servir quem chega ao Reino Unido de qualquer parte do mundo. Hoje, a Jorge Ferreira Movers é uma referência na rota Portugal-Reino Unido, com uma frota própria, uma equipa dedicada e centenas de mudanças realizadas com sucesso.',
      storyP3:
        'O nosso compromisso não mudou desde o primeiro dia: tratar cada mudança com o mesmo cuidado com que trataríamos a nossa própria.',
      storyStat: '+10 Anos',
      storyStatLabel: 'de Experiência',
      valuesTitle: 'Os Nossos Valores',
      valuesTag: 'O Que Nos Move',
      valuesSubtitle:
        'Princípios simples que orientam cada conversa, cada recolha e cada entrega.',
      val1Title: 'Honestidade',
      val1Desc:
        'Orçamentos claros, sem letras pequenas. O que prometemos é o que entregamos.',
      val2Title: 'Pontualidade',
      val2Desc:
        'Chegamos à hora combinada. Entregamos na data confirmada. Sempre.',
      val3Title: 'Cuidado',
      val3Desc:
        'Cada objeto tem uma história. Tratamos os seus bens como se fossem nossos.',
      val4Title: 'Comunicação',
      val4Desc:
        'Estamos disponíveis antes, durante e depois da mudança. Nunca desaparecemos.',
      teamTitle: 'A Nossa Equipa',
      teamTag: 'Pessoas Reais',
      teamDesc:
        'Uma equipa bilingue, experiente e comprometida com a excelência em cada mudança.',
      fleetTitle: 'A Nossa Frota',
      fleetTag: 'Preparada Para a Estrada',
      fleetDesc:
        'Carrinhas próprias, identificadas, com elevadores de carga e totalmente seguradas. Preparadas para qualquer distância — de Londres a Lisboa.',
      ctaTitle: 'Conheça-nos Melhor',
      ctaSub:
        'A melhor forma de nos conhecer é conversar. Sem compromisso, sem pressão.',
      ctaBtn: 'Falar Connosco',
      heroImageAlt: 'Equipa Jorge Ferreira Movers junto às carrinhas',
      storyImageAlt: 'Carrinha identificada Jorge Ferreira Movers na estrada',
      fleetImageAlt: 'Carrinha da frota Jorge Ferreira Movers',
    },
    contact: {
      pageTitle: 'Contacto',
      pageSubtitle:
        'Estamos a uma mensagem de distância. Resposta garantida em menos de 24 horas.',
      heroTag: 'Fale Connosco',
      heroTitle: 'Estamos Aqui\nPara Si.',
      heroSub:
        'Seja para pedir um orçamento, tirar uma dúvida ou simplesmente perceber como funcionamos — a nossa equipa está disponível.',
      formTitle: 'Envie-nos uma Mensagem',
      formName: 'Nome Completo',
      formEmail: 'Email',
      formSubject: 'Assunto',
      formMessage: 'Mensagem',
      formBtn: 'Enviar Mensagem',
      formSuccess:
        'Mensagem enviada com sucesso! Respondemos em menos de 24 horas.',
      formError:
        'Ocorreu um erro ao enviar. Por favor, tente novamente ou contacte-nos diretamente.',
      formNamePh: 'O seu nome',
      formEmailPh: 'o-seu-email@exemplo.com',
      formSubjectPh: 'Ex: Orçamento mudança Lisboa - Londres',
      formMsgPh:
        'Descreva a sua mudança: origem, destino, volume aproximado e data prevista...',
      infoTitle: 'Informações de Contacto',
      infoTag: 'Onde Estamos',
      ukOffice: 'Escritório Reino Unido',
      ptOffice: 'Escritório Portugal',
      phone: 'Telefone / WhatsApp',
      emailLabel: 'Email',
      hoursTitle: 'Horário de Atendimento',
      hours: 'Segunda a Sábado: 08h00 - 20h00',
      hoursNote:
        'Para urgências fora de horário, contacte-nos pelo WhatsApp.',
      whatsappBtn: 'Falar no WhatsApp Agora',
      mapsTitle: 'As Nossas Localizações',
      mapsTag: 'Onde Nos Encontrar',
      mapsSubtitle:
        'Consulte as nossas bases no Reino Unido e em Portugal ou abra a localização diretamente no Google Maps.',
      ukMapLabel: '🇬🇧 Escritório Reino Unido',
      ptMapLabel: '🇵🇹 Escritório Portugal',
      openMaps: 'Abrir no Google Maps',
    },
    privacy: {
      pageTitle: 'Política de Privacidade',
      pageSubtitle:
        'Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais.',
      heroTag: 'Privacidade e Transparência',
      heroTitle: 'Os Seus Dados.\nA Nossa Responsabilidade.',
      heroSub:
        'Tratamos os seus dados com cuidado, transparência e apenas para as finalidades necessárias à prestação dos nossos serviços.',
      documentTag: 'Informação Legal',
      documentTitle: 'Política de Privacidade',
      documentIntro:
        'Esta política explica como a Jorge Ferreira Movers trata dados pessoais quando visita o nosso site, pede um orçamento, nos contacta ou contrata um serviço.',
      lastUpdatedLabel: 'Última atualização',
      lastUpdated: '19 de junho de 2026',
      contentsTitle: 'Nesta política',
      section1Title: '1. Quem é responsável pelos seus dados',
      section1P1:
        'A Jorge Ferreira Movers é responsável pelo tratamento dos dados pessoais descritos nesta política. Pode contactar-nos através de ferreiramovers.uk@gmail.com ou do telefone +44 7796 601194.',
      section1P2:
        'Operamos a partir de 4 Newman Road, Croydon, CR0 3JX, London, England, e de Estrada da Mala Posta, Casal Mil Homens, 2440-231 Golpilheira, Batalha, Portugal.',
      section2Title: '2. Dados que podemos recolher',
      section2P1:
        'Recolhemos apenas os dados adequados ao contacto e à organização do serviço solicitado.',
      section2B1:
        'Dados de identificação e contacto, como nome, email, telefone e morada.',
      section2B2:
        'Informação sobre a mudança, incluindo origem, destino, datas, acessos, inventário e necessidades especiais.',
      section2B3:
        'Comunicações trocadas connosco e informação necessária à faturação e ao pagamento.',
      section2B4:
        'Dados técnicos básicos sobre a utilização do site, quando recolhidos pelos sistemas de segurança, alojamento ou cookies autorizados.',
      section3Title: '3. Como utilizamos os dados e com que fundamento',
      section3P1:
        'Podemos utilizar os seus dados para responder a pedidos, preparar orçamentos, planear e executar serviços, gerir pagamentos, prestar apoio e cumprir obrigações legais.',
      section3P2:
        'O tratamento baseia-se, consoante o caso, na execução de diligências pré-contratuais ou de um contrato, no cumprimento de obrigações legais, no nosso interesse legítimo em operar e proteger o negócio ou no seu consentimento.',
      section3P3:
        'Não utilizamos os seus dados para decisões exclusivamente automatizadas com efeitos jurídicos ou semelhantes.',
      section4Title: '4. Com quem podemos partilhar os dados',
      section4P1:
        'Podemos partilhar dados estritamente necessários com membros da equipa, prestadores de alojamento, email, pagamentos, contabilidade, armazenamento, seguros, apoio tecnológico ou parceiros de transporte envolvidos no serviço.',
      section4P2:
        'Exigimos que estes destinatários protejam os dados e apenas os utilizem para a finalidade autorizada. Também podemos divulgar informação quando a lei, uma autoridade competente ou a defesa de direitos legais o exija.',
      section5Title: '5. Transferências entre países',
      section5P1:
        'Como prestamos serviços entre Portugal e o Reino Unido, determinados dados podem ser tratados em ambos os países. Quando uma transferência internacional exige salvaguardas adicionais, utilizamos um mecanismo legal adequado e medidas de proteção proporcionais.',
      section6Title: '6. Durante quanto tempo guardamos os dados',
      section6P1:
        'Conservamos os dados apenas durante o tempo necessário para responder ao pedido, prestar o serviço, gerir a relação com o cliente e cumprir prazos legais, fiscais, contabilísticos, de seguro ou de defesa de reclamações.',
      section6P2:
        'Quando os dados deixam de ser necessários, são eliminados ou anonimizados de forma segura.',
      section7Title: '7. Como protegemos os dados',
      section7P1:
        'Aplicamos medidas técnicas e organizativas razoáveis para reduzir riscos de perda, acesso indevido, alteração ou divulgação. Apesar destes cuidados, nenhum sistema de transmissão ou armazenamento é totalmente isento de risco.',
      section8Title: '8. Os seus direitos',
      section8P1:
        'Nos termos do RGPD e do UK GDPR, e conforme aplicável, pode pedir acesso, retificação, apagamento, limitação, portabilidade ou oposição ao tratamento dos seus dados.',
      section8P2:
        'Quando o tratamento depende do consentimento, pode retirá-lo a qualquer momento, sem afetar o tratamento anterior. Alguns direitos podem estar sujeitos a exceções legais.',
      section8P3:
        'Para exercer um direito, escreva para ferreiramovers.uk@gmail.com. Poderemos pedir informação necessária para confirmar a sua identidade.',
      section9Title: '9. Cookies e serviços externos',
      section9P1:
        'O site pode utilizar cookies estritamente necessários ao funcionamento e, mediante consentimento quando exigido, tecnologias opcionais de análise ou integração. Pode gerir cookies nas definições do navegador e, quando disponível, no mecanismo de preferências do site.',
      section9P2:
        'Links ou conteúdos de terceiros, incluindo Google Maps, WhatsApp e redes sociais, estão sujeitos às políticas de privacidade desses serviços.',
      section10Title: '10. Reclamações e alterações',
      section10P1:
        'Se tiver uma questão sobre privacidade, contacte-nos primeiro para que possamos ajudar. Também pode apresentar reclamação à autoridade de proteção de dados competente, nomeadamente a ICO no Reino Unido ou a CNPD em Portugal.',
      section10P2:
        'Podemos atualizar esta política para refletir alterações legais, técnicas ou operacionais. A versão em vigor será publicada nesta página com a respetiva data de atualização.',
      questionTitle: 'Tem Uma Questão Sobre os Seus Dados?',
      questionText:
        'Fale diretamente connosco. Responderemos com clareza e sem complicações.',
      questionBtn: 'Contactar a Nossa Equipa',
    },
    terms: {
      pageTitle: 'Termos de Uso',
      pageSubtitle:
        'As condições aplicáveis à utilização do site e aos nossos serviços.',
      heroTag: 'Condições Claras',
      heroTitle: 'Confiança Começa\nCom Transparência.',
      heroSub:
        'Estes termos explicam as regras de utilização do site e os princípios gerais que orientam os serviços da Jorge Ferreira Movers.',
      documentTag: 'Informação Legal',
      documentTitle: 'Termos de Uso',
      documentIntro:
        'Ao utilizar este site ou contratar os nossos serviços, concorda com estes termos. As condições específicas do seu serviço constarão do orçamento, confirmação de reserva ou acordo celebrado consigo.',
      lastUpdatedLabel: 'Última atualização',
      lastUpdated: '19 de junho de 2026',
      contentsTitle: 'Nestes termos',
      section1Title: '1. Sobre nós e aceitação dos termos',
      section1P1:
        'Este site é operado pela Jorge Ferreira Movers. Pode contactar-nos através de ferreiramovers.uk@gmail.com ou do telefone +44 7796 601194.',
      section1P2:
        'Se não concordar com estes termos, não deverá utilizar o site. Nada nestes termos limita direitos obrigatórios que lhe sejam atribuídos enquanto consumidor.',
      section2Title: '2. Serviços e orçamentos',
      section2P1:
        'Prestamos serviços de mudanças, transporte, man and van, embalagem e soluções relacionadas, sujeitos a disponibilidade, rota e confirmação.',
      section2P2:
        'Os orçamentos são preparados com base na informação fornecida pelo cliente. Alterações de volume, acessos, distância, datas, tempos de espera ou serviços adicionais podem alterar o preço final, após comunicação ao cliente.',
      section3Title: '3. Reserva e pagamento',
      section3P1:
        'A reserva só fica confirmada quando receber a nossa confirmação e cumprir qualquer requisito de depósito ou pagamento indicado no orçamento.',
      section3P2:
        'Os preços, prazos, formas de pagamento e impostos aplicáveis serão indicados na proposta ou confirmação. Valores vencidos podem impedir o início ou a continuação do serviço, dentro dos limites legais.',
      section4Title: '4. Responsabilidades do cliente',
      section4P1:
        'O cliente deve fornecer informação completa e correta, garantir acesso seguro aos locais, estar presente ou representado nas horas acordadas e identificar previamente bens frágeis, valiosos, pesados ou de tratamento especial.',
      section4P2:
        'O cliente é responsável por obter autorizações, documentos aduaneiros, licenças de estacionamento ou permissões de acesso que lhe sejam solicitadas, salvo quando acordarmos assumir essas tarefas por escrito.',
      section5Title: '5. Bens que não transportamos',
      section5P1:
        'Salvo acordo expresso e legalmente permitido, não transportamos materiais perigosos ou ilegais, armas, explosivos, substâncias inflamáveis, alimentos perecíveis, animais vivos, dinheiro, joias, documentos insubstituíveis ou outros bens de risco excecional.',
      section5P2:
        'O cliente deve informar-nos antes da reserva sobre qualquer artigo que possa exigir condições especiais. Podemos recusar bens que coloquem pessoas, veículos, instalações ou outras cargas em risco.',
      section6Title: '6. Acesso, estacionamento e tempos de espera',
      section6P1:
        'O cliente deve informar antecipadamente sobre escadas, elevadores, restrições de altura ou peso, longas distâncias de transporte a pé e dificuldades de estacionamento.',
      section6P2:
        'Custos de estacionamento, portagens, congestionamento, ferries, armazenamento, multas causadas por instruções incorretas ou tempos de espera não previstos podem ser cobrados quando aplicável e previamente explicados.',
      section7Title: '7. Embalagem e preparação dos bens',
      section7P1:
        'Quando a embalagem não faz parte do serviço, o cliente deve preparar e proteger adequadamente os bens antes da recolha. Não nos responsabilizamos por danos diretamente causados por embalagem inadequada feita pelo cliente, sem prejuízo dos direitos legais aplicáveis.',
      section7P2:
        'Móveis ou equipamentos que exijam desmontagem, instalação técnica ou desconexão devem ser identificados antecipadamente.',
      section8Title: '8. Seguro, responsabilidade e limites',
      section8P1:
        'A cobertura aplicável, eventuais franquias, exclusões e limites serão os indicados no orçamento, na apólice ou na confirmação do serviço. O cliente deve declarar antes da mudança bens de valor elevado ou invulgar.',
      section8P2:
        'Não excluímos responsabilidade que não possa ser excluída por lei. Qualquer limitação será aplicada apenas na medida permitida e não prejudica os direitos obrigatórios do consumidor.',
      section9Title: '9. Atrasos e acontecimentos fora do nosso controlo',
      section9P1:
        'Fazemos todos os esforços razoáveis para cumprir os horários comunicados, mas trânsito, meteorologia, controlos fronteiriços, avarias, acidentes, greves ou outros acontecimentos fora do nosso controlo podem causar atrasos.',
      section9P2:
        'Quando isso acontecer, informaremos o cliente assim que possível e procuraremos uma solução razoável.',
      section10Title: '10. Cancelamentos e alterações',
      section10P1:
        'Pedidos de cancelamento ou alteração devem ser comunicados o mais cedo possível. As condições, prazos e eventuais custos aplicáveis serão os indicados no orçamento ou na confirmação da reserva e respeitarão a legislação obrigatória.',
      section10P2:
        'Se tivermos de cancelar um serviço confirmado, proporemos uma nova data ou o reembolso dos valores pagos pelo serviço não prestado, conforme aplicável.',
      section11Title: '11. Danos, perdas e reclamações',
      section11P1:
        'O cliente deve verificar os bens na entrega e comunicar danos, perdas ou divergências logo que razoavelmente possível, juntando fotografias, comprovativos e informação suficiente para analisarmos a ocorrência.',
      section11P2:
        'Investigaremos as reclamações de boa-fé e indicaremos os passos seguintes de acordo com o contrato, a cobertura de seguro e a legislação aplicável.',
      section12Title: '12. Utilização do site e propriedade intelectual',
      section12P1:
        'O conteúdo, marca, design, fotografias e materiais do site pertencem à Jorge Ferreira Movers ou são utilizados com autorização. Não podem ser copiados, vendidos ou explorados comercialmente sem autorização prévia.',
      section12P2:
        'Não garantimos que o site esteja sempre disponível ou livre de erros. Links de terceiros são disponibilizados por conveniência e não significam que controlamos ou aprovamos esses serviços.',
      section13Title: '13. Privacidade',
      section13P1:
        'O tratamento de dados pessoais relacionado com o site e os nossos serviços é descrito na Política de Privacidade, que faz parte destas condições.',
      section14Title: '14. Lei aplicável e contacto',
      section14P1:
        'Estes termos são regidos pelas leis aplicáveis ao serviço e ao consumidor em causa. Quando legalmente permitido, os tribunais de Inglaterra e País de Gales terão competência, sem afastar direitos obrigatórios de recurso a tribunais ou mecanismos de resolução de litígios do país do consumidor.',
      section14P2:
        'Para qualquer dúvida sobre estes termos, contacte-nos antes de reservar. Teremos todo o gosto em explicar as condições aplicáveis ao seu serviço.',
      questionTitle: 'Precisa de Esclarecer Alguma Condição?',
      questionText:
        'Converse connosco antes da reserva. Queremos que saiba exatamente com o que pode contar.',
      questionBtn: 'Falar Connosco',
    },
  },
  en: {
    nav: {
      home: 'Home',
      international: 'International Moves',
      personalOrganizer: 'Personal Organizer',
      limpeza: 'Post-Move Cleaning',
      services: 'Services',
      about: 'About Us',
      contact: 'Contact',
      quote: 'Get a Quote',
    },
    footer: {
      rights: 'All rights reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      madeWith: 'Made with ❤️ by',
      addressUK: '4 Newman Road, Croydon, CR0 3JX, London, England',
      addressPT:
        'Estrada da Mala Posta, Casal Mil Homens, 2440-231 Golpilheira, Batalha, Portugal',
      phone: 'Phone',
      email: 'Email',
      followUs: 'Follow us',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
    },
    whatsapp: {
      message: 'Hello! I would like to get a quote for a move.',
    },
    cta: {
      quote: 'Get a Quote',
      contact: 'Contact Now',
      whatsapp: 'Chat on WhatsApp',
      learn: 'Learn More',
    },
    home: {
      heroTag: 'International Removal Specialists',
      heroTitle: 'Your Move.\nWith People Who Know\nThe Way.',
      heroSubtitle:
        'From Portugal to the United Kingdom — or door to door in your city. Over a decade caring for your belongings as if they were our own.',
      heroCta1: 'Get a Free Quote',
      heroCta2: 'See Our Services',
      heroRoute: 'PT-UK Service',
      heroInsurance: 'Insurance Included',
      heroRating: '5 Stars',
      heroImageAlt: 'Jorge Ferreira Movers van loading a move',
      teamImageAlt: 'Jorge Ferreira Movers team beside the fleet',
      heroBadgeNumber: '500+ Moves',
      heroBadgeText: 'Completed Successfully',

      trustYears: '10+ Years Experience',
      trustMoves: '500+ Moves Completed',
      trustCountries: '2 Countries, 1 Team',
      trustRating: '5-Star Rating',
      trustYearsLabel: 'Years Experience',
      trustMovesLabel: 'Moves Completed',
      trustCountriesLabel: 'Countries Served',
      trustRatingLabel: 'Average Rating',

      servicesTag: 'What We Do',
      servicesTitle: 'Complete Solutions\nFor Every Move',
      servicesSubtitle:
        'Whether a single box or an entire home — we have the right service for you.',
      service1Title: 'International Removals',
      service1Desc:
        'Portugal and the UK are our two sides of home. We handle everything: packing, transport, customs and door-to-door delivery.',
      service2Title: 'Man & Van',
      service2Desc:
        'Fast and affordable solution for smaller volumes. Perfect for students, singles and small offices anywhere in the UK.',
      service3Title: 'Local Moves UK',
      service3Desc:
        'Full service across London and surrounding areas. Punctuality, care and professionalism on every job.',
      service4Title: 'Professional Packing',
      service4Desc:
        'Our materials protect every item as if it were the first time. From artwork to fragile goods — nothing arrives broken.',
      servicesLink: 'See All Services',
      servicesCta: 'See All Services and Prices',
      learnMore: 'Learn More',

      whyTag: 'Why Choose Us',
      whyTitle: 'Moves Are About\nTrust, Not Just Boxes.',
      whySubtitle:
        'We are Portuguese, we live this reality and we know what it means to move between two countries.',
      why1Title: 'We Know Both Sides',
      why1Desc:
        'Our team has lived between Portugal and the UK for over a decade. It is not just work — it is our own story.',
      why2Title: 'Communication Without Borders',
      why2Desc:
        'We speak Portuguese and English. Available by phone, email and WhatsApp in both countries.',
      why3Title: 'No Surprises at the End',
      why3Desc:
        'Clear quote, dates met, no hidden costs. Transparency is the foundation of every client relationship.',
      why4Title: 'Own Fleet, Fully Insured',
      why4Desc:
        'Our vans are owned, branded and fully insured. Your belongings travel protected from start to finish.',
      whyCta: 'Talk to Us',
      whyStatement: 'Free quote. No commitment. Reply within 24h.',
      fleetImageAlt: 'Two Jorge Ferreira Movers fleet vans',

      galleryTag: 'Our Fleet in Action',
      galleryTitle: 'Every Journey\nCarries Our Mark',
      gallerySubtitle:
        'Real photos from our operations — because transparency is the best guarantee.',
      galleryImageAlt: 'Real Jorge Ferreira Movers operation',
      galleryCta: 'Get a Free Quote',

      ctaBannerTitle: 'Ready to Start Your Move?',
      ctaBannerSubtitle:
        'Talk to us today. The quote is free and with no commitment.',
      ctaBannerCta1: 'Get a Quote Now',
      ctaBannerCta2: 'Chat on WhatsApp',
      ctaBannerImageAlt: 'Jorge Ferreira Movers vans during a move',
    },
    services: {
      pageTitle: 'Services and Prices',
      pageSubtitle:
        'Honest solutions for every need. Clear prices, no surprises.',
      heroTag: 'Full Transparency',
      heroTitle: 'Services Built\nFor You.',
      heroSub:
        'Every move is different. That is why we have options for every situation — from a single box to an entire home.',
      manvanTag: 'Clear Prices',
      manvanTitle: 'Man & Van',
      manvanDesc:
        'The most agile solution for smaller volumes. Ideal for students, young professionals and small offices. Available across London and surrounding areas.',
      manvanNote: 'Minimum 2 hours on all services.',
      price1Title: '1 Man & Van',
      price1Value: '£65',
      price1Unit: '/ hour',
      price1Min: 'Minimum 2 hours',
      price2Title: '2 Men & Van',
      price2Value: '£80',
      price2Unit: '/ hour',
      price2Min: 'Minimum 2 hours',
      price3Title: '3 Men & Van',
      price3Value: '£95',
      price3Unit: '/ hour',
      price3Min: 'Minimum 2 hours',
      price4Title: '4 Men & 2 Vans',
      price4Value: '£115',
      price4Unit: '/ hour',
      price4Min: 'Minimum 4 hours',
      priceCta: 'Request This Service',
      inclTitle: 'What Is Included',
      incl1: 'Loading and unloading of your belongings',
      incl2: 'Furniture protection with blankets and bubble wrap',
      incl3: 'Furniture assembly and disassembly (on request)',
      incl4: 'Direct communication with the driver on moving day',
      incl5: 'Cargo insurance included in all services',
      additionalTag: 'More Solutions',
      intlTitle: 'International Removals',
      intlDesc:
        'For those who need to move their life between Portugal and the UK. We handle the entire process — from the first box to delivery at the new address.',
      intlCta: 'Learn More About International Moves',
      packTitle: 'Packing Service',
      packDesc:
        'Do not want the stress of packing? Our team handles everything. We use certified materials to protect each item, from fragile goods to bulky furniture.',
      packCta: 'Request Packing Service',
      storageTitle: 'Temporary Storage',
      storageDesc:
        'Need to store your belongings during the move? We have partnerships with self-storage companies in London to keep your goods safe.',
      storageCta: 'Talk About Storage',
      ctaTitle: 'Not Sure Which Service is Right?',
      ctaSub:
        'Talk to us. We will explain everything and present the most suitable quote for your situation.',
      ctaBtn: 'Get a Free Quote',
      heroImageAlt: 'Professional boxes prepared for a move',
    },
    international: {
      pageTitle: 'International Removals',
      pageSubtitle:
        'Portugal to the United Kingdom. United Kingdom to Portugal. We know the way.',
      heroTag: 'PT-UK Route Specialists',
      heroTitle: 'Your Life Does Not\nStop at Borders.',
      heroSub:
        'Dozens of families and professionals trust us every year to make this journey. Leave the logistics to us.',
      howTitle: 'How It Works',
      howTag: 'Simple Process',
      howSubtitle:
        'Four clear steps, one team always present and communication from start to finish.',
      step1Title: '1. Contact and Quote',
      step1Desc:
        'Talk to us by phone, email or WhatsApp. Tell us the moving volume and we will send a detailed quote within 24 hours.',
      step2Title: '2. Date Planning',
      step2Desc:
        'We set the collection date in Portugal or the UK and confirm the delivery window at the destination.',
      step3Title: '3. Packing and Collection',
      step3Desc:
        'Our team arrives on time, carefully packs every item and loads the van in an organised and secure way.',
      step4Title: '4. Transport and Delivery',
      step4Desc:
        'We travel by the most efficient route, stay in contact throughout the journey and personally deliver to the new address.',
      whatTitle: 'What We Transport',
      whatTag: 'No Limitations',
      whatSubtitle:
        'From personal belongings to entire homes, we plan the right protection for every volume.',
      what1: 'Complete household or apartment furniture',
      what2: 'Appliances and equipment',
      what3: 'Artwork and fragile objects (special packing)',
      what4: 'Office contents and work equipment',
      what5: 'Personal boxes, clothes and everyday belongings',
      routesTitle: 'Our Routes',
      routesTag: 'PT and UK',
      routesSubtitle:
        'Flexible collections and deliveries, with door-to-door coverage in both countries.',
      route1: 'Lisbon — London',
      route2: 'Porto — London',
      route3: 'Braga — Manchester',
      route4: 'Faro — Birmingham',
      route5: 'Anywhere in Portugal to anywhere in the United Kingdom',
      faqTitle: 'Frequently Asked Questions',
      faqTag: 'Answers',
      faqSubtitle:
        'Straight answers to prepare your international move with confidence.',
      faq1q: 'How long does a move from Portugal to the UK take?',
      faq1a:
        'On average, 3 to 5 working days depending on volume and route. We always confirm the delivery window before departure.',
      faq2q: 'Is customs documentation required?',
      faq2a:
        'Post-Brexit residential moves between Portugal and the UK require specific documentation. We guide our clients throughout the process.',
      faq3q: 'Are belongings insured during transport?',
      faq3a:
        'Yes. All transport includes cargo insurance. Fragile belongings are packed with certified materials by our team.',
      faq4q: 'Do you also provide packing at the origin?',
      faq4a:
        'Yes. We can travel to the origin and handle all packing. Simply mention it when requesting the quote.',
      ctaTitle: 'Ready to Make This Journey?',
      ctaSub:
        'Thousands of kilometres — but with our team, it feels as though we are right beside you.',
      ctaBtn: 'Request an International Quote',
      heroImageAlt:
        'Jorge Ferreira Movers van on an international route by the sea',
      transportImageAlt: 'Pallets packed for international transport',
    },
    personalOrganizer: {
      heroTag: 'Premium Service',
      heroTitle: 'From the Box to the Right Place.',
      heroSubtitle:
        'Moving is not enough — it needs to be organised. Our Personal Organizer team transforms your new home into a functional, tidy space ready to live in from day one.',
      whatTag: 'What It Is',
      whatTitle: 'Professional Organisation By Your Side',
      whatSubtitle:
        'Personal Organizer goes beyond the move. It is a service dedicated to those who want to start their new chapter with everything in the right place.',
      whatP1:
        'After a move, the feeling of chaos can be overwhelming. Boxes everywhere, things out of place, not knowing where to begin. Our Personal Organizer service exists precisely to eliminate that stress.',
      whatP2:
        "Our specialist team works alongside you to categorise, organise and arrange every room in your new home. From the kitchen to the children's bedroom — everything ends up in the right place, labelled and functional.",
      whatP3:
        'It is the ideal service for families, busy professionals and anyone who values their time and well-being.',
      whatCta: 'Request a Personal Organizer Quote',
      inclTag: 'What Is Included',
      inclTitle: 'A Complete Organisation Service',
      card1Title: 'Sorting and Categorising',
      card1Desc:
        'We sort and categorise all your belongings by room, type and frequency of use.',
      card2Title: 'Professional Labelling',
      card2Desc:
        'All boxes and belongings are clearly labelled for immediate location.',
      card3Title: 'Room by Room Organisation',
      card3Desc:
        'Kitchen, living room, bedrooms, bathroom — each space is organised logically and functionally.',
      card4Title: 'Final Arrangement',
      card4Desc:
        'We do not leave until everything is in place. Your home is ready to live in from the very first moment.',
      card5Title: 'Flexible Service',
      card5Desc:
        'Available before, during or after the move. We adapt the service to your pace and needs.',
      card6Title: 'Personalised Support',
      card6Desc:
        'We work at your pace, respecting your preferences and the sentimental value of each item.',
      galleryTag: 'Our Work',
      galleryTitle: 'Results That Speak for Themselves',
      gallerySubtitle: 'Every organised space means a calmer family.',
      ctaTitle: 'Ready for an Organised Home From Day One?',
      ctaSubtitle:
        'Talk to us and discover how Personal Organizer can transform your move into a calm and organised experience.',
      ctaBtn1: 'Get a Quote',
      ctaBtn2: 'Chat on WhatsApp',
      galleryImage1Alt: 'Personal Organizer arranging clothes in a wardrobe',
      galleryImage2Alt: "Professional organisation of a children's wardrobe",
      galleryImage3Alt: 'Shirts organised by colour on matching hangers',
      galleryImage4Alt: 'Shoe collection organised on shelves',
      whatsappMessage:
        'Hello! I would like to learn more about the Personal Organizer service.',
    },
    limpeza: {
      heroTag: 'Professional Cleaning',
      heroTitle: 'Your New Home, Spotless From Day One.',
      heroSubtitle:
        'Before you move in or after you move out — our post-move cleaning team leaves every room gleaming, sanitised and ready for your new life.',
      preTitle: 'Pre-Move-In Cleaning',
      preSubtitle: 'Receive your new home in the best possible condition',
      preItem1: 'Deep cleaning of all rooms',
      preItem2: 'Sanitisation of bathrooms and kitchen',
      preItem3: 'Cleaning of windows, glass and frames',
      preItem4: 'Vacuuming and washing of floors',
      preItem5: 'Removal of debris from previous works or move',
      preCta: 'Get a Quote →',
      postTitle: 'Post-Move-Out Cleaning',
      postSubtitle: 'Leave the previous space in perfect condition',
      postItem1: 'General cleaning for property handover',
      postItem2: 'Removal of leftover items and debris',
      postItem3: 'Cleaning of marks on walls and skirting boards',
      postItem4: 'Full bathroom sanitisation',
      postItem5: 'Property preparation for new viewing or tenancy',
      postCta: 'Get a Quote →',
      whyTag: 'Why Choose Us',
      whyTitle: 'Professional Cleaning is Different',
      why1Title: 'Speed and Efficiency',
      why1Desc:
        'Trained team that gets the job done in the shortest time possible without compromising quality.',
      why2Title: 'Certified Products',
      why2Desc:
        'We use professional cleaning products that are safe for children, pets and the environment.',
      why3Title: 'Guaranteed Results',
      why3Desc:
        'If it is not perfect, we come back. Your satisfaction is our priority.',
      why4Title: 'Flexible Scheduling',
      why4Desc:
        'Available any day including weekends and bank holidays. We adapt to your calendar.',
      whyCta: 'Schedule Cleaning',
      galleryTag: 'Real Results',
      galleryTitle: 'Transformed Spaces',
      ctaTitle: 'Your Home Deserves a Spotless Start.',
      ctaSubtitle:
        'Contact us today and receive a free quote for post-move cleaning.',
      ctaBtn1: 'Get a Free Quote',
      ctaBtn2: 'Chat on WhatsApp',
      image1Alt: 'Empty, bright and spotless apartment',
      image2Alt: 'Professional cleaning a bright living room',
      image3Alt: 'Clean apartment kitchen ready to use',
      image4Alt: 'Empty living room with clean flooring and natural light',
      image5Alt: 'Empty apartment with a sanitised bathroom',
      ctaImageAlt: 'Empty, clean room ready for a new move',
      whatsappMessage:
        'Hello! I would like to learn more about the Post-Move Cleaning service.',
    },
    about: {
      pageTitle: 'About Us',
      pageSubtitle:
        'A company founded with one purpose: to make international moves more human.',
      heroTag: 'Our Story',
      heroTitle: 'We Are Portuguese.\nWe Know What It Means\nTo Move Country.',
      heroSub:
        'Jorge Ferreira founded this company after personally experiencing a move between Portugal and the United Kingdom. Since then, we have helped hundreds of families do the same — with care, honesty and professionalism.',
      storyTitle: 'Our Story',
      storyTag: 'From the Beginning',
      storyP1:
        'It all began with one van, plenty of determination and one certainty: there was a better way to help people move between Portugal and the United Kingdom. Jorge Ferreira, the company founder, had personally experienced the difficulties of an international move — poor communication, missed deadlines and insufficient care for belongings.',
      storyP2:
        'He decided to create a different service. A service made by Portuguese people, for Portuguese people — while being equally prepared to serve anyone arriving in the UK from anywhere in the world. Today, Jorge Ferreira Movers is a trusted name on the Portugal-UK route, with its own fleet, a dedicated team and hundreds of successful moves.',
      storyP3:
        'Our commitment has not changed since day one: to treat every move with the same care we would give our own.',
      storyStat: '10+ Years',
      storyStatLabel: 'of Experience',
      valuesTitle: 'Our Values',
      valuesTag: 'What Moves Us',
      valuesSubtitle:
        'Simple principles that guide every conversation, every collection and every delivery.',
      val1Title: 'Honesty',
      val1Desc:
        'Clear quotes with no small print. What we promise is what we deliver.',
      val2Title: 'Punctuality',
      val2Desc:
        'We arrive at the agreed time. We deliver on the confirmed date. Always.',
      val3Title: 'Care',
      val3Desc:
        'Every object has a story. We treat your belongings as if they were our own.',
      val4Title: 'Communication',
      val4Desc:
        'We are available before, during and after the move. We never disappear.',
      teamTitle: 'Our Team',
      teamTag: 'Real People',
      teamDesc:
        'A bilingual, experienced team committed to excellence on every move.',
      fleetTitle: 'Our Fleet',
      fleetTag: 'Ready for the Road',
      fleetDesc:
        'Our own branded vans, fitted with loading lifts and fully insured. Prepared for any distance — from London to Lisbon.',
      ctaTitle: 'Get to Know Us Better',
      ctaSub:
        'The best way to know us is to talk. No commitment, no pressure.',
      ctaBtn: 'Talk to Us',
      heroImageAlt: 'Jorge Ferreira Movers team beside the vans',
      storyImageAlt: 'Branded Jorge Ferreira Movers van on the road',
      fleetImageAlt: 'Jorge Ferreira Movers fleet van',
    },
    contact: {
      pageTitle: 'Contact',
      pageSubtitle:
        'We are only a message away. A reply is guaranteed within 24 hours.',
      heroTag: 'Talk to Us',
      heroTitle: 'We Are Here\nFor You.',
      heroSub:
        'Whether you need a quote, have a question or simply want to understand how we work — our team is ready to help.',
      formTitle: 'Send Us a Message',
      formName: 'Full Name',
      formEmail: 'Email',
      formSubject: 'Subject',
      formMessage: 'Message',
      formBtn: 'Send Message',
      formSuccess:
        'Message sent successfully! We will reply within 24 hours.',
      formError:
        'Something went wrong while sending your message. Please try again or contact us directly.',
      formNamePh: 'Your name',
      formEmailPh: 'your-email@example.com',
      formSubjectPh: 'E.g. Lisbon to London moving quote',
      formMsgPh:
        'Tell us about your move: origin, destination, approximate volume and preferred date...',
      infoTitle: 'Contact Information',
      infoTag: 'Where We Are',
      ukOffice: 'United Kingdom Office',
      ptOffice: 'Portugal Office',
      phone: 'Phone / WhatsApp',
      emailLabel: 'Email',
      hoursTitle: 'Opening Hours',
      hours: 'Monday to Saturday: 8:00 am - 8:00 pm',
      hoursNote:
        'For urgent enquiries outside these hours, contact us on WhatsApp.',
      whatsappBtn: 'Chat on WhatsApp Now',
      mapsTitle: 'Our Locations',
      mapsTag: 'Where to Find Us',
      mapsSubtitle:
        'See our UK and Portugal bases or open either location directly in Google Maps.',
      ukMapLabel: '🇬🇧 United Kingdom Office',
      ptMapLabel: '🇵🇹 Portugal Office',
      openMaps: 'Open in Google Maps',
    },
    privacy: {
      pageTitle: 'Privacy Policy',
      pageSubtitle:
        'Learn how we collect, use and protect your personal information.',
      heroTag: 'Privacy and Transparency',
      heroTitle: 'Your Data.\nOur Responsibility.',
      heroSub:
        'We handle your information carefully, transparently and only for the purposes needed to provide our services.',
      documentTag: 'Legal Information',
      documentTitle: 'Privacy Policy',
      documentIntro:
        'This policy explains how Jorge Ferreira Movers handles personal information when you visit our website, request a quote, contact us or book a service.',
      lastUpdatedLabel: 'Last updated',
      lastUpdated: '19 June 2026',
      contentsTitle: 'In this policy',
      section1Title: '1. Who is responsible for your information',
      section1P1:
        'Jorge Ferreira Movers is responsible for the personal information described in this policy. You can contact us at ferreiramovers.uk@gmail.com or on +44 7796 601194.',
      section1P2:
        'We operate from 4 Newman Road, Croydon, CR0 3JX, London, England, and Estrada da Mala Posta, Casal Mil Homens, 2440-231 Golpilheira, Batalha, Portugal.',
      section2Title: '2. Information we may collect',
      section2P1:
        'We collect only the information appropriate for your enquiry and the organisation of the service requested.',
      section2B1:
        'Identity and contact details such as your name, email, telephone number and address.',
      section2B2:
        'Move details including origin, destination, dates, access, inventory and special requirements.',
      section2B3:
        'Communications with us and information needed for billing and payment.',
      section2B4:
        'Basic technical information about website use when collected by security, hosting or authorised cookie systems.',
      section3Title: '3. How and why we use information',
      section3P1:
        'We may use your information to answer enquiries, prepare quotes, plan and deliver services, manage payments, provide support and comply with legal obligations.',
      section3P2:
        'Depending on the circumstances, processing is based on steps taken before a contract, performance of a contract, compliance with legal duties, our legitimate interests in operating and protecting the business, or your consent.',
      section3P3:
        'We do not use your information for solely automated decisions that produce legal or similarly significant effects.',
      section4Title: '4. Who we may share information with',
      section4P1:
        'We may share strictly necessary information with team members and providers of hosting, email, payments, accounting, storage, insurance, technology support or transport services involved in your move.',
      section4P2:
        'We require recipients to protect the information and use it only for the authorised purpose. We may also disclose information where required by law, a competent authority or the defence of legal rights.',
      section5Title: '5. International transfers',
      section5P1:
        'Because we provide services between Portugal and the United Kingdom, some information may be handled in both countries. Where an international transfer requires extra safeguards, we use an appropriate legal mechanism and proportionate protections.',
      section6Title: '6. How long we keep information',
      section6P1:
        'We keep information only for as long as needed to respond to your request, deliver the service, manage the customer relationship and meet legal, tax, accounting, insurance or claims requirements.',
      section6P2:
        'When information is no longer needed, it is securely deleted or anonymised.',
      section7Title: '7. How we protect information',
      section7P1:
        'We use reasonable technical and organisational measures to reduce the risk of loss, unauthorised access, alteration or disclosure. Despite these measures, no transmission or storage system is entirely risk-free.',
      section8Title: '8. Your rights',
      section8P1:
        'Under the GDPR and UK GDPR, where applicable, you may request access, correction, deletion, restriction, portability or object to the processing of your personal information.',
      section8P2:
        'Where processing relies on consent, you may withdraw it at any time without affecting earlier processing. Some rights are subject to legal exceptions.',
      section8P3:
        'To exercise a right, email ferreiramovers.uk@gmail.com. We may ask for information needed to confirm your identity.',
      section9Title: '9. Cookies and external services',
      section9P1:
        'The website may use cookies that are strictly necessary for operation and, with consent where required, optional analytics or integration technologies. You can manage cookies in your browser and, where available, through the website preference tool.',
      section9P2:
        'Third-party links or content, including Google Maps, WhatsApp and social media, are governed by those services’ own privacy policies.',
      section10Title: '10. Complaints and changes',
      section10P1:
        'If you have a privacy concern, please contact us first so we can help. You may also complain to the relevant data protection authority, including the ICO in the United Kingdom or the CNPD in Portugal.',
      section10P2:
        'We may update this policy to reflect legal, technical or operational changes. The current version will be published on this page with its update date.',
      questionTitle: 'Have a Question About Your Data?',
      questionText:
        'Talk to us directly. We will answer clearly and without unnecessary complexity.',
      questionBtn: 'Contact Our Team',
    },
    terms: {
      pageTitle: 'Terms of Use',
      pageSubtitle:
        'The conditions that apply to use of the website and our services.',
      heroTag: 'Clear Conditions',
      heroTitle: 'Trust Starts\nWith Transparency.',
      heroSub:
        'These terms explain the website rules and the general principles governing services provided by Jorge Ferreira Movers.',
      documentTag: 'Legal Information',
      documentTitle: 'Terms of Use',
      documentIntro:
        'By using this website or booking our services, you agree to these terms. The specific conditions for your service will appear in the quote, booking confirmation or agreement made with you.',
      lastUpdatedLabel: 'Last updated',
      lastUpdated: '19 June 2026',
      contentsTitle: 'In these terms',
      section1Title: '1. About us and acceptance of these terms',
      section1P1:
        'This website is operated by Jorge Ferreira Movers. You can contact us at ferreiramovers.uk@gmail.com or on +44 7796 601194.',
      section1P2:
        'If you do not agree with these terms, you should not use the website. Nothing in these terms limits mandatory rights available to you as a consumer.',
      section2Title: '2. Services and quotations',
      section2P1:
        'We provide removals, transport, man and van, packing and related solutions, subject to availability, route and confirmation.',
      section2P2:
        'Quotes are prepared from the information supplied by the customer. Changes in volume, access, distance, dates, waiting time or additional services may change the final price after we inform you.',
      section3Title: '3. Booking and payment',
      section3P1:
        'A booking is confirmed only when you receive our confirmation and meet any deposit or payment requirement stated in the quote.',
      section3P2:
        'Prices, deadlines, payment methods and applicable taxes will be stated in the proposal or confirmation. Overdue amounts may prevent a service from starting or continuing, within legal limits.',
      section4Title: '4. Customer responsibilities',
      section4P1:
        'The customer must provide complete and accurate information, ensure safe access, be present or represented at the agreed times and identify fragile, valuable, heavy or specialist items in advance.',
      section4P2:
        'The customer is responsible for permits, customs documents, parking arrangements or access permissions requested from them, unless we agree in writing to handle those tasks.',
      section5Title: '5. Goods we do not carry',
      section5P1:
        'Unless expressly agreed and legally permitted, we do not carry dangerous or illegal materials, weapons, explosives, flammable substances, perishable food, live animals, cash, jewellery, irreplaceable documents or other exceptionally high-risk goods.',
      section5P2:
        'You must tell us before booking about any item requiring special conditions. We may refuse goods that put people, vehicles, premises or other loads at risk.',
      section6Title: '6. Access, parking and waiting time',
      section6P1:
        'You must tell us in advance about stairs, lifts, height or weight restrictions, long carrying distances and parking difficulties.',
      section6P2:
        'Parking, tolls, congestion charges, ferries, storage, fines caused by incorrect instructions or unexpected waiting time may be charged where applicable and explained to you.',
      section7Title: '7. Packing and preparation',
      section7P1:
        'Where packing is not included, the customer must prepare and protect goods properly before collection. We are not responsible for damage directly caused by inadequate customer packing, subject to applicable statutory rights.',
      section7P2:
        'Furniture or equipment requiring dismantling, technical installation or disconnection must be identified in advance.',
      section8Title: '8. Insurance, liability and limits',
      section8P1:
        'Applicable cover, excesses, exclusions and limits will be those stated in the quote, policy or service confirmation. High-value or unusual items must be declared before the move.',
      section8P2:
        'We do not exclude liability that cannot legally be excluded. Any limitation applies only to the extent permitted by law and does not affect mandatory consumer rights.',
      section9Title: '9. Delays and events outside our control',
      section9P1:
        'We make every reasonable effort to meet communicated times, but traffic, weather, border checks, breakdowns, accidents, strikes or other events outside our control may cause delays.',
      section9P2:
        'If this happens, we will inform you as soon as possible and seek a reasonable solution.',
      section10Title: '10. Cancellations and changes',
      section10P1:
        'Cancellation or change requests should be made as early as possible. Applicable conditions, notice periods and charges will be stated in the quote or booking confirmation and will comply with mandatory law.',
      section10P2:
        'If we must cancel a confirmed service, we will offer a new date or refund amounts paid for the service not provided, as applicable.',
      section11Title: '11. Damage, loss and complaints',
      section11P1:
        'You should check goods on delivery and report damage, loss or discrepancies as soon as reasonably possible, providing photographs, evidence and enough information for us to investigate.',
      section11P2:
        'We will review complaints in good faith and explain the next steps under the contract, insurance cover and applicable law.',
      section12Title: '12. Website use and intellectual property',
      section12P1:
        'The website content, brand, design, photographs and materials belong to Jorge Ferreira Movers or are used with permission. They may not be copied, sold or commercially exploited without prior authorisation.',
      section12P2:
        'We do not guarantee that the website will always be available or error-free. Third-party links are provided for convenience and do not mean that we control or endorse those services.',
      section13Title: '13. Privacy',
      section13P1:
        'The handling of personal information connected with the website and our services is described in the Privacy Policy, which forms part of these conditions.',
      section14Title: '14. Governing law and contact',
      section14P1:
        'These terms are governed by the laws applicable to the relevant service and consumer. Where legally permitted, the courts of England and Wales have jurisdiction, without removing mandatory rights to use courts or dispute-resolution mechanisms in the consumer’s country.',
      section14P2:
        'Contact us before booking if you have any question about these terms. We will be happy to explain the conditions applying to your service.',
      questionTitle: 'Need to Clarify a Condition?',
      questionText:
        'Talk to us before booking. We want you to know exactly what to expect.',
      questionBtn: 'Talk to Us',
    },
  },
} as const

interface LangContextType {
  lang: Lang
  setLang: (language: Lang) => void
  t: (typeof translations)[Lang]
}

export const LangContext = createContext<LangContextType>({
  lang: 'pt',
  setLang: () => undefined,
  t: translations.pt,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')

  return createElement(
    LangContext.Provider,
    { value: { lang, setLang, t: translations[lang] } },
    children
  )
}

export function useLang() {
  return useContext(LangContext)
}
