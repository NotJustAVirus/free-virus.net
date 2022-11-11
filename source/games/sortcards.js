$(document).ready(function(){
    loadsite();
});
    
function loadsite() {

    //load cards
    $.get("getcards.php", function(data){
        // const main = $("#main");
        const card_contain = $("#card_container");
        data = JSON.parse(data);
        
        for (const card_data of data) {
            var tags = "";
            var tags_data = [];
            for (const tag of card_data.tags) {
                const name_lower = tag.name.toLowerCase();
                tags += `<div style="color: #${tag.color};" class="tag" data-tag="${name_lower}">${tag.name}</div>`;
                tags_data.push(name_lower);
            }
            var card = `<div class='column' data-tags="${tags_data.toString()}">
                <div class='card'>
                    <div class='top'>
                        <div class='text'>
                            <a href='${card_data.path}'><div class='title'>${card_data.title}</div></a>
                            <div class='description'>${card_data.description}</div>
                        </div>
                        <a href='${card_data.path}'>
                            <div class='icon'>
                                <img src='${card_data.path}/icon.png' alt='${card_data.title}'>
                                <div class='overlay'></div>
                            </div>
                        </a>
                    </div>
                    <div class='taglist'>` + tags + `
                    </div>
                </div>
            </div>`;
            card_contain.append(card);
        }
        $("#card_container .tag").click(function() {
            addsearchtag($(this).attr("data-tag"));
        });
    });
    
    //load tags
    $.get("gettags.php", function(data){
        const avalible_tags = $("#avalible_tags");
        const selected_tags = $("#selected_tags");
        data = JSON.parse(data);
        var alltags = "";
        for (const tag_data of data) {
            var tag = `<div style="color: #${tag_data.color};" class="tag" data-tag="${tag_data.name.toLowerCase()}">${tag_data.name}</div>`;
            alltags += tag;
        }
        avalible_tags.append(alltags);
        avalible_tags.children(".tag").click(function() {
            addsearchtag($(this).attr("data-tag"));
        });

        selected_tags.append(alltags);
        selected_tags.children(".tag").addClass("hidden");
        selected_tags.children(".tag").click(function() {
            removesearchtag($(this).attr("data-tag"));
        });
    });
}

function addsearchtag(tag) {
    const selected_tags = $("#selected_tags");
    selected_tags.children(`[data-tag='${tag}']`).removeClass("hidden");
    updatecards();
}

function removesearchtag(tag) {
    const selected_tags = $("#selected_tags");
    selected_tags.children(`[data-tag='${tag}']`).addClass("hidden");
    updatecards();
}

function updatecards() {
    console.log(1);
    var selected = [];
    $("#selected_tags").children(".tag").each(function (index, value) {
        if (!$(this).hasClass("hidden")) {
            selected.push($(this).attr("data-tag"));
        }
    });
    if (selected.length == 0) {
        $(".column").each(function (index, value) {
            $(this).removeClass("hidden");
            return;
        });
    } else {
        $(".column").each(function (index, value) {
            this_tags = $(this).attr("data-tags").split(",");
            // console.log(this_tags);
            for (const this_tag of this_tags) {
                if (selected.includes(this_tag)) {
                    $(this).removeClass("hidden");
                    return;
                }
            }
            $(this).addClass("hidden");
            return;
        });
    }
}
