# Kanban Board

## Installation

Öncelikle Projeyi clonelayın ve istediğiniz bir editör ile açın.

```sh
git clone git@github.com:habipyesilyurt17/kanban-board.git
```

## Project setup
Proyi kendi dizininde iken terminal yardımı ile ilgili paketleri yükleyin.
```sh
npm install 
```
Benzer şekilde aynı işlemi proje dosyları içerisinde yer alan frontend dosyası dizinine giderek yapın.
```sh
cd frontend
npm install
```

## Compile
İki farklı terminal ekranından hem serverı hemde clientı ayağa kaldıralım.

Server için projenin kendi dizininde şu komut satırını çalıştırın.
```sh
npm start
```
Client için projenin frontend dizinine geçmek ve projeyi çalıştırmak için şu komut satırlarını çalıştırın.
```sh
cd frontend
npm start
```
## Api Testleri
Server ayağa kalkdıktan sonra aşağıda yer alan endpoint ile grapiql panelinden GraphQL sorgularının testlerini rahatlıkla yapabilirsiniz.
```sh
http://localhost:8000/graphql
```
