
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>CFC 3</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <section class="container d-flex flex-column  align-items-center mb-4">
        <h1>CFC 3</h1>
        <h2>Choose your cat</h2>
    </section>
    <div class="container d-flex flex-column  align-items-center">
        <div id="clock" class="clock display-4"></div>
        <div id="message" class="message"></div>
    </div>
    <div class="row">
        <div id="firstSide" class="container d-flex flex-column  align-items-center side first-side col-5">
            <div class="row d-flex justify-content-end">
                <div class="col-auto">
                    <ul id="leftInfo" class="cat-info list-group">
                        <li class="list-group-item name">Cat Name</li>
                        <li class="list-group-item age">Cat age</li>
                        <li class="list-group-item skills">Cat Info</li>
                        <li class="list-group-item record">Wins:<span class="wins"></span> Loss: <span class="loss"></span></li>
                    </ul>
                </div>
                <div class="col-auto featured-cat-fighter">
                    <img id="leftImage" class="featured-cat-fighter-image img-rounded" src="https://via.placeholder.com/300" alt="Featured cat fighter">
                </div>
                <div class="col-auto w-100" style="margin-top: 24px">
                    <div id="leftCats" class="row fighter-list">
                        <div class="col-md-4 mb-1">
                            <div class="fighter-box">
                                <img alt="Figter Box 1" width="150" height="150" class="cat-thumbnail">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2 d-flex flex-column align-items-center">
            <p class="display-4">VS</p>
            <button id="generateFight" class="btn btn-primary mb-4 btn-lg">Fight</button>
            <button id="randomFight" class="btn btn-secondary">Select Random fighters</button>
            <a href="create-cat.html" class="btn btn-primary mb-4 addcat" id="addCatBtn">Add Cats</a>
        </div>
        <div id="secondSide" class="container d-flex flex-column align-items-center side second-side col-5">
            <div class="row">
                <div class="col-auto featured-cat-fighter">
                    <img id="rightImage" class="featured-cat-fighter-image img-rounded" src="https://via.placeholder.com/300" alt="Featured cat fighter">
                </div>
                <div class="col-auto">
                    <ul id="rightInfo" class="cat-info list-group">
                        <li class="list-group-item name">Cat Name</li>
                        <li class="list-group-item age">Cat age</li>
                        <li class="list-group-item skills">Cat Info</li>
                        <li class="list-group-item record">Wins: <span class="wins"></span>Loss: <span class="loss"></span></li>
                    </ul>
                </div>
                <div class="col-auto w-100" style="margin-top: 24px">
                    <div id="rightCats" class="row fighter-list">
                        <div class="col-md-4 mb-1">
                            <div class="fighter-box">
                                <img alt="Figter Box 1" width="150" height="150" class="cat-thumbnail">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        
    </div>
    <script src="./src/app.js"></script>
</body>
</html>
