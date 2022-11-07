
CREATE TABLE [dbo].[item](
	[id_item] [int] IDENTITY(1,1) NOT NULL,
	[category] [varchar](10) NULL,
	[description] [varchar](100) NULL,
	[price] [numeric](18, 0) NULL,
	[width] [int] NULL,
	[height] [int] NULL,
	[length] [int] NULL,
	[weight] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_item] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT INTO item VALUES('01','Caneta Bic Azul',1000,0,0,0,0)
GO
INSERT INTO item VALUES('01','Lápis',2000,0,0,0,0)
GO
INSERT INTO item VALUES('01','Caderno',2000,0,0,0,0)



CREATE TABLE [dbo].[pedido](
	[id_order] [int] IDENTITY(1,1) NOT NULL,
	[coupon_code] [varchar](10) NULL,
	[coupon_percentage] [numeric](18, 0) NULL,
	[code] [varchar](40) NULL,
	[cpf] [varchar](18) NULL,
	[issue_date] Datetime NOT NULL,
	[freight] [int] NULL,
	[sequence] [int] NULL,
	[total] [numeric](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_order] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



CREATE TABLE [dbo].[ItemPedido](
	[cod_pedido]  [varchar](40)   NOT NULL,
	[id_item] [int] NOT NULL,
	[price] [numeric](18, 0) NULL,
	[quantity] [numeric](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[cod_pedido] ASC,
	[id_item] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

create table coupon (
	code varchar(20),
	percentage numeric,
	expire_date Datetime,
	primary key (code)
);

insert into coupon (code, percentage, expire_date) values ('VALE10', 10, null);



CREATE TABLE [dbo].[stock_entry](
    [id] [int] IDENTITY(1,1) NOT NULL,
	[id_item] [int] NOT NULL,
	[operation] [varchar](10) NULL,
	[quantity] [numeric](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


//////////////////// Projeto do professor

insert into ccca.item (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Guitarra', 1000, 100, 50, 15, 3);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Amplificador', 5000, 50, 50, 50, 22);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Acessórios', 'Cabo', 30, 10, 10, 10, 1);

create table ccca.coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

insert into ccca.coupon (code, percentage, expire_date) values ('VALE20', 20, '2022-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table ccca.order (
	id_order serial,
	coupon text,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric,
	primary key (id_order)
);

create table ccca.order_item (
	id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);