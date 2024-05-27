# React SPA
これは[フィヨルドブートキャンプのReact単元の課題](https://bootcamp.fjord.jp/practices/262)です。

create-react-appを使ってSPAとしてメモアプリを作成しました。

課題の要件は[メモアプリSPA版](https://bootcamp.fjord.jp/pages/239)の通りですが、以下を機能追加しました。

- 同じタイトルのメモを作成できない
- メモの内容に変更がない状態で編集ボタンを押下できない

## 準備
このアプリはローカル環境で立ち上げることを想定しています。

### 1. Git clone
```
git clone git@github.com:Judeeeee/react-spa.git
```
### 2. ディレクトリの移動と`npm install`

```
cd react-memo-app
```

でディレクトリを移動した後に以下を実行してください。

```
npm install
```

### 3. 起動
以下のコマンドで起動してください。

```
npm start
```

その後、http://localhost:3000
にアクセスすると、メモアプリが表示されます。
