class GithubController {

  constructor(githubService) {
    this.result = {};
    this.service = githubService;
  }

  getDetails() {
    this.service.getItems(this.githubUsername).then((res) => {
      this.result = res.data;
      console.log(this.result);
    });
  }

}

export default GithubController;
