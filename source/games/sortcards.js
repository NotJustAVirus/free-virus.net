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
            for (const tag of card_data.tags) {
                tags += `<div style="color: #${tag.color};" class="tag" data-tag="${tag.name.toLowerCase()}">${tag.name}</div>`;
            }
            var card = `<div class='column'>
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
        selected_tags.children(".tag").hide();
        selected_tags.children(".tag").click(function() {
            removesearchtag($(this).attr("data-tag"));
        });
    });
}

function addsearchtag(tag) {
    const selected_tags = $("#selected_tags");
    selected_tags.children(`[data-tag='${tag}']`).show();
}

function removesearchtag(tag) {
    const selected_tags = $("#selected_tags");
    selected_tags.children(`[data-tag='${tag}']`).hide();
}

function updatecards() {
    
}