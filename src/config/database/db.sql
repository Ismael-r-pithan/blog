     drop table if exists posts;
     drop table if exists users;

     create table posts (
         id serial not null,
         added_by char(8) not null,
         created_at date not null,
         content text not null,
         primary key(id),
         foreign key(added_by) references users(id)
     );

     create table users (
        id char(8) not null,
        name varchar(30) not null,
        email varchar(60) not null,
        password varchar(255) not null,
        created_at date not null,
        primary key(id)
     );

