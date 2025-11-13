use vamomv;

show tables;

select * from carro;

select * from agenda;
select * from usuario;

INSERT INTO usuario (s_usuario_name, s_usuario_secondName, s_usuario_password, i_usuario_licenseDriving, s_usuario_sectorShipping, d_usuario_dateExpiration, d_usuario_createdAt, d_usuario_updateAt)
Values ('Fabricio', 'Rocha', 'senha', 896574345, 'Detran', '2020-03-07', NOW(), NOW());

DESCRIBE comida;