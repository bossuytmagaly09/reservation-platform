import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zfvsayabkzouadibxzxi.supabase.co'
const supabaseKey = 'sb_publishable_41GASAsjwz_C-fFkkpZsug_XwwglTlY'

export const supabase = createClient(supabaseUrl, supabaseKey)
