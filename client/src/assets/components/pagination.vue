<template>
<b-container>
  <div class="overflow-auto">
    <b-row>   
      <b-col cols="12" sm="4" class="my-1"
        :key="index"
        v-for="(item, index) in currentPageItems" 
          >
        <!-- <b-card         
          :bg-variant="item.variant"
          text-variant="white"
          :header="item.title"
          class="text-center"
          > -->
        <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>  

      </b-col>

    </b-row>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
  </b-container>

    <!-- <p class="mt-3">Current Page: {{ currentPage }}</p>

    
  </div> -->
</template>


<script>
import cardmeme from './cardmeme.vue';

  export default {
    data() {
      return {
        perPage: 3,
        currentPage: 1,
        items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        ]
      }
    },
    components: {
        cardmeme
    },
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>