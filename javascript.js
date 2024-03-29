$(document).ready(function () {
  const fetchData = (page) => {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=221aa6a5488d596f52c55125468878fd`,
      method: "get",
      // beforeSend: function () {
      //   $("#load").removeClass();
      // },
      success: function displayFilm(data) {
        console.log(data.results);
        console.log(typeof data.results);
        console.log(data.title);
        //Fitur Tampilkan Film
        let dataTable = [];
        for (let i = 0; i < data.results.length; i++) {
          const film = data.results[i];
          rilisFilm = film.release_date;
          tahunFilm = rilisFilm.split("-");
          console.log(tahunFilm[0]);
          let html = "";
          html += `<tr>`;
          html += `<td>${i + 1}</td>
            <td>${film.title}</td>
            <td>${tahunFilm[0]}</td>
            <td>${film.popularity}</td>
            <td>${film.vote_average}</td>
            <td>      <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal${film.id}"
          >
            Details
          </button></td> `;
          html += `</tr>`;

          // $("tbody").append(html);
          // $("tbody").html(html);
          dataTable.push(html);

          let modal = `<div
          class="modal fade"
          id="exampleModal${film.id}"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  ${film.title}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body d-flex gap-3 width-50% ">
                <div>
                    <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" class="rounded" alt="">
                </div>
                  <div>
                    <p><strong>Realease Date</strong>: ${film.release_date}</p>
                    <p><strong>Summary</strong> : ${film.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

          $("body").append(modal);
          console.log(i + 1);
          console.log(film.id);
          console.log(film.title);
          console.log(film.release_date);
          console.log(film.popularity);
          console.log(film.vote_average);
        }
        //Fitur Details

        $("tbody").empty();
        dataTable.forEach((data) => {
          $("tbody").append(data);
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  };

  // fetch page 1 when first load
  fetchData(1);
  // activate page 1
  $(`#page-1`).addClass("active");

  for (let page = 1; page <= 5; page++) {
    $(`#page-${page}`).click(() => {
      // fetch data per page
      fetchData(page);
      
      // change active page
      for (let pageIdx = 1; pageIdx <= 5; pageIdx++) {
        if (page === pageIdx) {
          $(`#page-${pageIdx}`).addClass("active")
        } else {
          $(`#page-${pageIdx}`).removeClass("active")
        }
      }
    });
  }
});
