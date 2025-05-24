module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css", // 또는 "true" (less 사용 시)
      },
      "antd",
    ],
  ],
};
