const cover =
    document.getElementById("cover");

const book =
    document.getElementById("book");

const contents =
    document.getElementById("contents");

const progress =
    document.getElementById("progress");


function openBook(){

    cover.style.transition =
        "opacity .5s ease, transform .5s ease";

    cover.style.opacity =
        "0";

    cover.style.transform =
        "scale(1.02)";


    setTimeout(function(){

        cover.style.display =
            "none";

        book.style.display =
            "block";

        window.scrollTo(
            0,
            0
        );


        requestAnimationFrame(
            function(){

                book.style.transition =
                    "opacity .8s ease";

                book.style.opacity =
                    "1";

            }
        );


        activateFade();

    },500);

}


function backToCover(){

    closeContents();

    book.style.opacity =
        "0";


    setTimeout(function(){

        book.style.display =
            "none";

        cover.style.display =
            "flex";

        cover.style.opacity =
            "1";

        cover.style.transform =
            "scale(1)";

        window.scrollTo(
            0,
            0
        );

        progress.style.width =
            "0%";

    },500);

}


function openContents(){

    contents.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closeContents(){

    contents.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


function goTo(id){

    closeContents();


    setTimeout(function(){

        const target =
            document.getElementById(id);


        if(!target){
            return;
        }


        target.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    },350);

}


window.addEventListener(
    "scroll",
    function(){

        if(
            book.style.display !==
            "block"
        ){

            return;

        }


        const scrollTop =
            window.scrollY;


        const total =
            document.documentElement
                .scrollHeight
            -
            window.innerHeight;


        if(total <= 0){
            return;
        }


        const percentage =
            (
                scrollTop /
                total
            ) * 100;


        progress.style.width =
            Math.min(
                percentage,
                100
            ) + "%";

    }
);


function activateFade(){

    const elements =
        document.querySelectorAll(
            ".fade"
        );


    const observer =
        new IntersectionObserver(

            function(entries){

                entries.forEach(
                    function(entry){

                        if(
                            entry.isIntersecting
                        ){

                            entry.target
                                .classList
                                .add(
                                    "show"
                                );

                        }

                    }
                );

            },

            {
                threshold:.12
            }

        );


    elements.forEach(
        function(element){

            observer.observe(
                element
            );

        }
    );

}


document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Escape"
        ){

            closeContents();

        }

    }
);


document.addEventListener(
    "visibilitychange",
    function(){

        if(
            document.hidden
        ){

            document.title =
                "0.01% — Come back...";

        }
        else{

            document.title =
                "0.01% — A Story About Her";

        }

    }
);