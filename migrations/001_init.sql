create table if not exists aa_mold_types (
  code varchar(2) primary key,
  name text not null,
  description text,
  is_active boolean not null default true
);

create table if not exists bbb_board_cores (
  code varchar(3) primary key check (code ~ '^[A-Z][0-9]{2}$'),
  name text not null,
  description text,
  is_active boolean not null default true
);

create table if not exists cc_formaldehyde_standards (
  code varchar(2) primary key check (code in ('E0', 'E1', 'E2')),
  name text not null,
  description text,
  is_active boolean not null default true
);

create table if not exists d_surface_materials (
  code varchar(1) primary key check (code in ('M', 'L', 'A')),
  name text not null,
  description text,
  is_active boolean not null default true
);

create table if not exists eeee_supplier_papers (
  code varchar(4) primary key,
  name text not null,
  description text,
  is_active boolean not null default true
);

create table if not exists ff_backer_materials (
  code varchar(2) primary key,
  name text not null,
  description text,
  is_active boolean not null default true
);

create table if not exists gg_sizes (
  code varchar(2) primary key,
  name text not null,
  description text,
  is_active boolean not null default true
);

create table if not exists hh_glues (
  code varchar(2) primary key,
  name text not null,
  description text,
  is_active boolean not null default true
);

insert into cc_formaldehyde_standards (code, name) values
  ('E0', 'E0'),
  ('E1', 'E1'),
  ('E2', 'E2')
on conflict (code) do nothing;

insert into d_surface_materials (code, name) values
  ('M', 'Melamine'),
  ('L', 'Laminate'),
  ('A', 'Acrylic')
on conflict (code) do nothing;

insert into ff_backer_materials (code, name) values
  ('BB', 'Mau den'),
  ('BG', 'Mau xam'),
  ('BW', 'Mau trang'),
  ('00', 'Mot mat'),
  ('DM', 'Dong mau')
on conflict (code) do nothing;

insert into aa_mold_types (code, name) values
  ('01', 'Loai khuon 01')
on conflict (code) do nothing;

insert into bbb_board_cores (code, name) values
  ('A01', 'Cot van A01')
on conflict (code) do nothing;

insert into eeee_supplier_papers (code, name) values
  ('0001', 'Ma giay NCC 0001')
on conflict (code) do nothing;

insert into gg_sizes (code, name) values
  ('01', 'Kich thuoc 01')
on conflict (code) do nothing;

insert into hh_glues (code, name) values
  ('01', 'Keo 01')
on conflict (code) do nothing;
