create table if not exists aa_mold_types (
  code varchar(2) primary key,
  name text not null,
  description text,
  is_active boolean not null default true
);

create table if not exists bbb_board_cores (
  code varchar(3) primary key check (code ~ '^[A-Z0-9]{3}$'),
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
  surface_material_code varchar(1) not null references d_surface_materials(code),
  description text,
  is_active boolean not null default true
);

alter table eeee_supplier_papers
  add column if not exists surface_material_code varchar(1) references d_surface_materials(code);

alter table eeee_supplier_papers
  drop column if exists surface_material_name;

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
  ('BB', 'Backer den'),
  ('BG', 'Backer xam'),
  ('BW', 'Backer trang'),
  ('00', 'Van chi co 1 mat'),
  ('DM', 'Dong mau, 2 mat cung mau')
on conflict (code) do nothing;

insert into aa_mold_types (code, name) values
  ('EV', 'HM.PL.EV.SZ'),
  ('HG', 'HM.PL.HG.NZ'),
  ('LU', 'SL.PL.LU.NZ'),
  ('MM', 'SL.PL.MM.NZ'),
  ('PL', 'HM.PL.PL.SZ'),
  ('RL', 'SL.PL.RL.NZ'),
  ('SH', 'HM.PL.SH.NZ'),
  ('TO', 'HM.PL.T.NZ'),
  ('WL', 'SL.PL.WL.SZ'),
  ('ZN', 'SL.PL.ZN.SZ')
on conflict (code) do nothing;

insert into bbb_board_cores (code, name) values
  ('M01', 'MF-MR12'),
  ('M02', 'MF-MR15'),
  ('M03', 'MF-MR17'),
  ('M04', 'MF-HR9-E1'),
  ('M05', 'MF-HR12-E1'),
  ('M06', 'MF-HR17-E1'),
  ('H01', 'HF-HR9-E1'),
  ('H02', 'HF-HR12-E1'),
  ('H03', 'HF-HR15-E1'),
  ('H04', 'HF-HR17-E1')
on conflict (code) do nothing;

insert into gg_sizes (code, name) values
  ('01', '1220 x 2440 x 3'),
  ('02', '1220 x 2440 x 6'),
  ('03', '1220 x 2440 x 9'),
  ('04', '1220 x 2440 x 12'),
  ('05', '1220 x 2440 x 15'),
  ('06', '1220 x 2440 x 17'),
  ('07', '1220 x 2440 x 18'),
  ('08', '1220 x 2440 x 21'),
  ('09', '1220 x 2440 x 25'),
  ('10', '1220 x 2440 x 32')
on conflict (code) do nothing;

insert into hh_glues (code, name) values
  ('01', 'MF'),
  ('02', 'UF'),
  ('03', 'PUR')
on conflict (code) do nothing;
