const rows = [];

window.addEventListener(

    "DOMContentLoaded",

    () => {

        document
            .querySelectorAll(
                "#noticeTable tbody tr"
            )

            .forEach(row => {

                const text =
                    row.innerText
                        .toLowerCase();

                rows.push({

                    el: row,

                    text: text,

                    compact:
                        text.replace(
                            /\s+/g,
                            ""
                        )
                });
            });
    }
);

function fastMatch(query, text) {

    let qi = 0;
    let gap = 0;

    for (
        let ti = 0;
        ti < text.length;
        ti++
    ) {

        if (
            text[ti] === query[qi]
        ) {

            qi++;

            gap = 0;

        } else {

            gap++;
        }

        // too scattered
        if (gap > 3) {
            return false;
        }

        if (
            qi === query.length
        ) {
            return true;
        }
    }

    return false;
}

function searchTable() {

    const query =

        document
            .getElementById("q")
            .value
            .toLowerCase()
            .trim();

    requestAnimationFrame(() => {

        if (!query) {

            for (const r of rows) {

                r.el.style.display = "";
            }

            return;
        }

        const compactQuery =
            query.replace(
                /\s+/g,
                ""
            );

        for (const r of rows) {

            if (
                r.text.includes(query)
            ) {

                r.el.style.display = "";
                continue;
            }

            if (

                compactQuery.length >= 2 &&

                fastMatch(
                    compactQuery,
                    r.compact
                )

            ){

                r.el.style.display = "";

            } else {

                r.el.style.display = "none";
            }
        }
    });
}