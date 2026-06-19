insert into site_settings (key, value, label, type, group_name) values
  ('site_name',        'Jorge Ferreira Movers',           'Nome do Site',          'text',  'geral'),
  ('site_tagline',     'Mudancas com Confianca, Portugal ao Reino Unido', 'Slogan', 'text',  'geral'),
  ('contact_phone',    '+44 7796 601194',                 'Telefone de Contacto',  'text',  'contacto'),
  ('contact_email',    'ferreiramovers.uk@gmail.com',     'Email de Contacto',     'email', 'contacto'),
  ('contact_address_uk', '4 Newman Road, Croydon, CR0 3JX, London, England', 'Morada Reino Unido', 'text', 'contacto'),
  ('contact_address_pt', 'Estrada da Mala Posta, Casal Mil Homens, 2440-231 Golpilheira, Batalha, Portugal', 'Morada Portugal', 'text', 'contacto'),
  ('contact_maps_uk',  'https://maps.app.goo.gl/rsZ4LnypTW7KRin18', 'Link Maps Reino Unido', 'url', 'contacto'),
  ('contact_maps_pt',  'https://maps.app.goo.gl/RAMQ4xXXL4LUrMWc9', 'Link Maps Portugal',    'url', 'contacto'),
  ('whatsapp_number',  '447796601194',                    'Numero WhatsApp',       'text',  'contacto'),
  ('resend_to_email',  'ferreiramovers.uk@gmail.com',     'Email Destino Formulario', 'email', 'sistema'),
  ('social_instagram', '',                                'Instagram',             'url',   'redes_sociais'),
  ('social_facebook',  '',                                'Facebook',              'url',   'redes_sociais')
on conflict (key) do nothing;

insert into pages (slug, title, description, order_num) values
  ('home',                    'Início',                   'Página principal',                                      1),
  ('servicos',                'Serviços',                 'Lista de serviços e preços',                             2),
  ('sobre-nos',               'Sobre Nós',                'História e valores da empresa',                          3),
  ('mudancas-internacionais', 'Mudanças Internacionais',  'Serviço de mudanças entre Portugal e o Reino Unido',     4),
  ('contacto',                'Contacto',                 'Formulário e moradas',                                   5),
  ('politica-de-privacidade', 'Política de Privacidade',  'Política de privacidade RGPD',                            6),
  ('termos-de-uso',           'Termos de Uso',            'Termos e condições de utilização',                       7)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  order_num = excluded.order_num;
