import fetchPonyfill from 'fetch-ponyfill';
const { fetch } = fetchPonyfill(Promise);

export function apiFetchPosts(page, per_page, sort, filter) {
    return fetch('https://blog.strapi.io/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=1f260788b4ec&limit='+per_page, {}).then((resp) => {
        return resp.json ? resp.json() : resp;
    });
}

export function apiFetchTopics(page, per_page, sort, filter) {
    return {
        topics: [{'title': 'News'}, {'title': 'Design'}, {'title': 'Hiring'}, {'title': 'Offers'}],
        response: {}
    }
}

export function apiFetchTags(page, per_page, sort, filter) {
    return {
        tags: [{'title': 'record'}, {'title': 'progress'}, {'title': 'freebies'}, {'title': 'offers'}],
        response: {}
    }
}

export function apiFetchPost(post_id) {
    return {
        post: {
            id: 10,
            title: 'A new NASA contest for the next generation of space exploration',
            content: '<p dir="ltr">Freelancer.com is once again helping NASA to crowdsource talent for its new era of space exploration. The National Aeronautics and Space Administration (NASA) is <a href="/contest/NASA-Contest-Design-the-Gateway-Program-Graphic-1451793.html">holding a contest</a> on Freelancer.com for a design to represent its new Gateway program.</p><p dir="ltr">The Gateway program is a history-making project that aims to put a spaceship in permanent orbit around the Moon. It will allow astronauts to live and work in lunar orbit. The plan is for humans to finally go back to the Moon’s surface, something&nbsp;nobody has done since 1976.</p><p dir="ltr">The Gateway is also intended to provide a refuelling and resupply station in the hope of eventually acting as a staging post for astronauts travelling to Mars.&nbsp;It&nbsp;represents a new step in reaching those dreams of the future many of us have had for decades.</p><p dir="ltr">One of our core aims at Freelancer.com is to connect talent with ideas, and NASA latest contest is another great example of how we can reach that goal together.</p><p dir="ltr">The contest proposes a graphic to be used at the Agency, with potential use in presentation materials and Gateway team products. Freelancers will have a role in shaping the visual identity of this exciting project.&nbsp;</p><p dir="ltr">As NASA numerous successful contests have shown, Freelancer.com’s online talent marketplace is where interesting and even groundbreaking responses can occur.</p><p dir="ltr">In 2015, for example, NASA chose an In-Space Manufacturing logo from 1,070 entries submitted by 429 freelancers.&nbsp;</p><p dir="ltr">Another 2015 NASA contest asked entrants to design a folding pattern for packaging a large radiation shield for future Mars missions.</p><p dir="ltr">Even a contest this specific received 157 entries from 78 freelancers. There really is no limit to the possibilities; if you have an idea, you can find a freelancer who can make it happen for you.</p><p dir="ltr">These&nbsp;examples demonstrate just how effective a crowdsourcing contest&nbsp;on Freelancer.com can be in the pursuit of brilliant solutions for tricky problems.</p><p dir="ltr">What’s your Gateway? Find out more about NASAs new contest <a href="/contest/NASA-Contest-Design-the-Gateway-Program-Graphic-1451793.html">here</a></p>'
        },
        response: {}
    }
}

export function apiFetchRelatables(post_id, page, per_page, sort, filter) {
    return {
        posts: [{}, {}, {}, {}, {}],
        response: {}
    }
}

export function apiFetchComments(post_id, page, per_page, sort, filter) {
    return {
        comments: [{}, {}, {}, {}],
        response: {}
    }
}

export function apiCreateComment( comment ) {
    return {
        comment: comment,
        response: {}
    }
}

export function apiUpdateComment( comment ) {
    return {
        comment: comment,
        response: {}
    }
}

export function apiDeleteComment( id ) {
    return {
        id: id,
        response: {}
    }
}

export function apiLikeComment( id ) {
    return {
        id: id,
        response: {}
    }
}