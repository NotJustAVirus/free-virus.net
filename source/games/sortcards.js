$(document).ready(function(){
    loadsite();
});
    
function loadsite() {

    $.get("getcards.php", function(data){ //load cards
        // const main = $("#main");
        const card_contain = $("#card_container");
        data = JSON.parse(data);
        
        for (const card_data of data) {
            var tags = "";
            var tags_data = [];
            for (const tag of card_data.tags) {
                const name_lower = tag.name.toLowerCase();
                tags += `<button style="color: #${tag.color};" class="tag" data-tag="${name_lower}">${tag.name}</button>`;
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
            togglesearchtag($(this).attr("data-tag"));
        });
    });
    
    $.get("gettags.php", function(data){ //load tags
        const avalible_tags = $("#avalible_tags");
        // const selected_tags = $("#selected_tags");
        data = JSON.parse(data);
        var alltags = "";
        for (const tag_data of data) {
            var tag = `<button style="color: #${tag_data.color};" class="tag" data-tag="${tag_data.name.toLowerCase()}">${tag_data.name}</button>`;
            alltags += tag;
        }
        avalible_tags.append(alltags);
        avalible_tags.children(".tag").click(function() {
            togglesearchtag($(this).attr("data-tag"));
        });
    });
}

function togglesearchtag(tag) {
    const avalible_tags = $("#avalible_tags");
    if (avalible_tags.children(`[data-tag='${tag}']`).hasClass("selected")) {
        $(`[data-tag='${tag}']`).removeClass("selected");
    } else {
        $(`[data-tag='${tag}']`).addClass("selected");
    }
    updatecards();
}

function updatecards() {
    var selected = [];
    $("#avalible_tags").children(".tag").each(function (index, value) {
        if ($(this).hasClass("selected")) {
            selected.push($(this).attr("data-tag"));
        }
    });
    if (selected.length == 0) {
        $(".column").each(function () {
            $(this).removeClass("hidden");
            return;
        });
    } else {
        $(".column").each(function () {
            this_tags = $(this).attr("data-tags").split(",");
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
