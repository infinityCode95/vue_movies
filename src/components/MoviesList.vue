<template>
    <BContainer>
        <h3 class="list-title">{{ listTitle }}</h3>
        <BRow>
            <template v-if="isExist">
                <BCol cols="3" v-for="(movie, key) in list" :key="key">
                    <MovieItem 
                        :movie="movie" 
                        @mouseover.native="onMouseOver(movie.Poster)"
                        @removeItem="omRemoveItem"
                        @showModal="onShowMovieInfo"
                    />
                </BCol>
            </template>
            <template v-else>
                <div>Empty List</div>
            </template>
        </BRow>
        <BModal body-class="movie-modal-body" :id="movieInfoModalID" size="xl" hide-footer hide-header>
            <MovieInfoModalContent :movie="selectedMovie" @closeModal="onCloseModal"/>
        </BModal>
    </BContainer>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import MovieItem from './MovieItem';
import MovieInfoModalContent from '@/components/MovieInfoModalContent';

export default {
    name: "MoviesList",
    props: {
        list: {
            type: Object,
            default: () => ({})
        }
    },
    data: () => ({
        movieInfoModalID: 'movie-info',
        selectedMovieID: '',
    }),
    components: {
        MovieItem,
        MovieInfoModalContent
    },  
    computed: {
        ...mapGetters('movies', ['isSearch']),
        isExist() {
            return Boolean(Object.keys(this.list).length);
        },
        listTitle() {
            return this.isSearch ? 'Search result' : 'IMDB Top 250';
        },
        selectedMovie() {
            return this.selectedMovieID ? this.list[this.selectedMovieID] : null;
        }
        
    },
    methods: {
        ...mapActions('movies', ['removeMovie']),
        onMouseOver(poster) {
            this.$emit('changePoster', poster);
        },
        async omRemoveItem({id, title}) {
            const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${title} ?`);

            if (isConfirmed) {
                this.removeMovie(id);
            }
        },
        onShowMovieInfo(id) {
            this.selectedMovieID = id;
            this.$bvModal.show(this.movieInfoModalID);
        },
        onCloseModal(id) {
            this.selectedMovieID = id;
            this.$bvModal.hide(this.movieInfoModalID);
        }
    }
};
</script>

<style scoped>
.list-title {
    font-size: 50px;
    margin: 0px 0px 30px 0px;
    color: #fff;
}
</style>

<style>
.movie-modal-body {
    padding: 0 !important; 
}
</style>