// ESモジュールとしてimport文を使用
import { expect } from "chai";
import File from "vinyl";
import myPlugin from "./index.js"; // あなたのプラグインのパスを指定

// テストケースの記述
describe("My Gulp Plugin", () => {
  it("should transform file contents", (done) => {
    // テスト用のファイルを作成
    const fakeFile = new File({
      path: "./test/src/",
      contents: Buffer.from("input data"),
    });

    // プラグインを適用
    const stream = myPlugin({
      dest: "./test/dest/",
      template_dir: "./test/template/",
    });

    // プラグインの結果を検証
    stream.on("data", (modifiedFile) => {
      //expect(modifiedFile.contents.toString()).to.equal("expected output");
      done();
    });

    // ファイルをストリームに追加
    stream.write(fakeFile);
    stream.end();
  });
});
