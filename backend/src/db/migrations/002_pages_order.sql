alter table pages add column if not exists order_num integer default 99;

update pages
set order_num = case slug
  when 'home' then 1
  when 'servicos' then 2
  when 'sobre-nos' then 3
  when 'mudancas-internacionais' then 4
  when 'contacto' then 5
  when 'politica-de-privacidade' then 6
  when 'termos-de-uso' then 7
  else 99
end;
